import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    const createBlogToggleRef = useRef()
    const createBlogFormRef = useRef()

    const handleLogin = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
    }

    const fetchBlogs = async () => {
        const fetchedBlogs = await blogService.getAll()
        setBlogs(fetchedBlogs)
    }

    const setNotification = (message) => {
        setMessage(message)
        setError(false)
        setTimeout(() => {
            setMessage(null)
        }, 6000)
    }

    const handleError = (error) => {
        if (!error) {
            error = 'something went wrong'
        }

        setMessage(error)
        setError(true)
        setTimeout(() => {
            setMessage(null)
        }, 6000)
    }

    const handleAddedBlog = async (blogToAdd) => {
        try {
            const createdBlog = await blogService.create(blogToAdd, user.token)
            setNotification(
                `${createdBlog.title} by ${createdBlog.author} added to blogs`,
            )
            createBlogFormRef.current.clearForm()
            createBlogToggleRef.current.toggleVisibility()
            setBlogs([...blogs, createdBlog])
        } catch (error) {
            handleError(error.response.data.error)
        }
    }

    const handleDeleteBlog = async (blogToDelete) => {
        if (window.confirm('do you want to delete blog?')) {
            try {
                const deletedBlog = await blogService.remove(
                    blogToDelete,
                    user.token,
                )
                setNotification(
                    `${deletedBlog.title} by ${deletedBlog.author} removed from blogs`,
                )
                setBlogs([
                    ...blogs.filter((blog) => blog.id !== deletedBlog.id),
                ])
            } catch (error) {
                handleError(error.response.data.error)
            }
        }
    }

    const handleUpdateBlog = async (blogToUpdate) => {
        try {
            const updatedBlog = await blogService.update(
                blogToUpdate,
                user.token,
            )
            setBlogs([
                ...blogs.filter((blog) => blog.id !== updatedBlog.id),
                updatedBlog,
            ])
        } catch (error) {
            handleError(error.response.data.error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification message={message} error={error} />
                <LoginForm
                    loginHandler={handleLogin}
                    errorHandler={handleError}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} error={error} />
            <div className="user">
                {user.name} logged in <button onClick={logout}>logout</button>
            </div>
            <Togglable buttonLabel="new blog" ref={createBlogToggleRef}>
                <CreateBlogForm
                    createHandler={handleAddedBlog}
                    ref={createBlogFormRef}
                />
            </Togglable>
            <br />
            {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        user={user}
                        blog={blog}
                        deleteHandler={handleDeleteBlog}
                        updateHandler={handleUpdateBlog}
                    />
                ))}
        </div>
    )
}

export default App
