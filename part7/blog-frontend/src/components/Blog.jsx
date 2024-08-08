import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateHandler, deleteHandler }) => {
    const [showDetails, setShowDetails] = useState(false)

    const likeBlog = async () => {
        updateHandler({ id: blog.id, likes: blog.likes + 1 })
    }

    const deleteBlog = async () => {
        deleteHandler(blog)
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
                {user.username === blog.user.username ? (
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
    user: PropTypes.any.isRequired,
    blog: PropTypes.any.isRequired,
    updateHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
}

export default Blog
