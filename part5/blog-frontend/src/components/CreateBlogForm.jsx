import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = forwardRef(({ createHandler }, refs) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        createHandler({ title, author, url })
    }

    const clearForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    useImperativeHandle(refs, () => {
        return {
            clearForm
        }
    })

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    <span>title</span> 
                    <input value={title} onChange={(event) => setTitle(event.target.value)} data-testid="title-input"/>
                </div>
                <div>
                    <span>author</span> 
                    <input value={author} onChange={(event) => setAuthor(event.target.value)} data-testid="author-input"/>
                </div>
                <div>
                    <span>url</span> 
                    <input value={url} onChange={(event) => setUrl(event.target.value)} data-testid="url-input"/>
                </div>
                <div>
                    <button>create</button>
                </div>
            </form>
        </div>
    )
})

CreateBlogForm.propTypes = {
    createHandler: PropTypes.func.isRequired,
}

export default CreateBlogForm