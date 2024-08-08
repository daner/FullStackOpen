import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useContext } from 'react'
import { showNotification } from '../NotificationContext'
import NotificationContext from '../NotificationContext'

const AnecdoteList = () => {

    const [notification, notficationDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()

    const updateNoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(item => item.id !== updatedAnecdote.id ? item : updatedAnecdote))
            showNotification(notficationDispatch, `Voted on ${updatedAnecdote.content}`, 5)
        }
    })

    const handleVote = (anecdote) => {
        updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>Failed to fetch anecdote data</div>
    }

    const anecdotes = result.data

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList