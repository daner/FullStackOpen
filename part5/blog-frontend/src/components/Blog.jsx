import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateHandler, deleteHandler, errorHandler }) => {
    const [showDetails, setShowDetails] = useState(false)

    const likeBlog = async () => {
        try {
            const updatedBlog = await blogService.update({ id: blog.id, likes: blog.likes + 1 }, user.token)
            updateHandler(updatedBlog)
        } catch (error) {
            errorHandler(error.response.data.error)
        }
    }

    const deleteBlog = async () => {
        if (window.confirm('do you want to delete blog?')) {
            try {
                const deletedBlog = await blogService.remove(blog, user.token)
                deleteHandler(deletedBlog)
            } catch (error) {
                errorHandler(error.response.data.error)
            }
        }
    }

    if (!showDetails) {
        return (
            <div className='blog'>
                {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
            </div>
        )
    }
    else {
        return (
            <div className='blog'>
                <div>
                    {blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes} <button onClick={likeBlog}>like</button>
                </div>
                <div>
                    {blog.user.name}
                </div>
                {user.username === blog.user.username ?
                    <div>
                        <button onClick={deleteBlog}>remove</button>
                    </div>
                    : <></>
                }
            </div>
        )
    }
}


Blog.propTypes = {
    user: PropTypes.any.isRequired,
    blog: PropTypes.any.isRequired,
    updateHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    errorHandler: PropTypes.func.isRequired
}

export default Blog