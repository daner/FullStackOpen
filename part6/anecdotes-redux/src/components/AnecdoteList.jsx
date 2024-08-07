import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes, filter}) => { 
        return anecdotes
                .filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((a, b) => a.votes > b.votes ? -1 : 1)
    })
    
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOn(id))
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
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default AnecdoteList