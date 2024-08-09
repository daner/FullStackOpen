import { showNotification } from '../reducers/notificationReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogsService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createHandler }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.user)

    const addBlogMutation = useMutation({
        mutationFn: blogsService.create,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            dispatch(showNotification(`Added ${newBlog.title}`, false, 5))
            createHandler()
            clearForm()
        },
    })

    const submit = async (event) => {
        event.preventDefault()
        addBlogMutation.mutate({
            blog: { title, author, url },
            token: currentUser.token,
        })
    }

    const clearForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2 className='font-bold'>create new</h2>
            <form onSubmit={submit}>
                <div>
                    <span className="label min-w-12">title</span>
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        data-testid="title-input"
                    />
                </div>
                <div>
                    <span className="label min-w-12">author</span>
                    <input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        data-testid="author-input"
                    />
                </div>
                <div>
                    <span className="label min-w-12">url</span>
                    <input
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        data-testid="url-input"
                    />
                </div>
                <div>
                    <button className='btn btn-blue'>create</button>
                </div>
            </form>
        </div>
    )
}

CreateBlogForm.displayName = 'CreateBlogForm'
CreateBlogForm.propTypes = {
    createHandler: PropTypes.func.isRequired,
}

export default CreateBlogForm
