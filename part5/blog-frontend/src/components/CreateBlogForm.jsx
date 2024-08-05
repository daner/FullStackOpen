import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlogForm = (user, successCallback, failedCallback) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        try {
            const createdBlog = await blogService.create({title, author, url}, user.token)
            successCallback(createdBlog)
        } catch(error) {
            failedCallback(error)                
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