import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {

    const { reset: resetContent, ...content } = useField('text')
    const { reset: resetAuthor, ...author }  = useField('text')
    const { reset: resetInfo, ...info }  = useField('text')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const reset = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content} />
                </div>
                <div>
                    author
                    <input name='author' {...author} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={reset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew