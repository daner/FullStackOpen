import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`you added ${content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
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