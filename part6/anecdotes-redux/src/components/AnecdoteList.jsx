import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes, filter}) => { 
        return anecdotes
                .filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((a, b) => a.votes > b.votes ? -1 : 1)
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteOn(anecdote.id))
        dispatch(setNotification(`you vote for ${anecdote.content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <>
            {anecdotes
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default AnecdoteList