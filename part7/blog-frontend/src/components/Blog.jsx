import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const currentUser = useSelector((state) => state.user)

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.map((item) =>
                    item.id !== updatedBlog.id ? item : updatedBlog,
                ),
            )
            dispatch(
                showNotification(
                    `Blog ${updatedBlog.title} was liked`,
                    false,
                    5,
                ),
            )
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.remove,
        onSuccess: (deletedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                [...blogs.filter((blog) => blog.id !== deletedBlog.id)],
            )
            dispatch(
                showNotification(
                    `Blog ${deletedBlog.title} was deleted`,
                    false,
                    5,
                ),
            )
        },
    })

    const likeBlog = async () => {
        updateBlogMutation.mutate({ id: blog.id, likes: blog.likes + 1 })
    }

    const deleteBlog = async () => {
        if (window.confirm('Sure?')) {
            deleteBlogMutation.mutate({
                blog: { id: blog.id },
                token: currentUser.token,
            })
        }
    }

    if (!showDetails) {
        return (
            <div className="blog">
                {blog.title} {blog.author}{' '}
                <button onClick={() => setShowDetails(true)}>view</button>
            </div>
        )
    } else {
        return (
            <div className="blog">
                <div>
                    {blog.title} {blog.author}{' '}
                    <button onClick={() => setShowDetails(false)}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes} <button onClick={likeBlog}>like</button>
                </div>
                <div>{blog.user.name}</div>
                {currentUser.username === blog.user.username ? (
                    <div>
                        <button onClick={deleteBlog}>remove</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

Blog.propTypes = {
    blog: PropTypes.any.isRequired,
}

export default Blog
