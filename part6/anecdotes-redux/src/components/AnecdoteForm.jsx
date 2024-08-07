import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm