import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlogForm = ({user, createHandler, errorHandler}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        try {
            const createdBlog = await blogService.create({title, author, url}, user.token)
            setTitle('')
            setAuthor('')
            setUrl('')
            createHandler(createdBlog)
        } catch(error) {
            errorHandler(error.response.data.error)                
        }
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div><span>title</span> <input value={title} onChange={(event) => setTitle(event.target.value) } /></div>
                <div><span>author</span> <input value={author} onChange={(event) => setAuthor(event.target.value)} /></div>
                <div><span>url</span> <input value={url} onChange={(event) => setUrl(event.target.value)} /></div>
                <div><button>create</button></div>
            </form>
        </div>
    )
}

export default CreateBlogForm