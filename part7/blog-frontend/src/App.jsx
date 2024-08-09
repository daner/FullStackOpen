import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

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

    const handleError = (error) => {
        if (!error) {
            error = 'something went wrong'
        }
        dispatch(showNotification(error, true, 5))
    }

    const handleAddedBlog = async (blogToAdd) => {
        try {
            const createdBlog = await blogService.create(blogToAdd, user.token)
            dispatch(
                showNotification(
                    `${createdBlog.title} by ${createdBlog.author} added to blogs`,
                    false,
                    5,
                ),
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
                dispatch(
                    showNotification(
                        `${deletedBlog.title} by ${deletedBlog.author} removed from blogs`,
                        false,
                        5,
                    ),
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
                <Notification />
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
            <Notification />
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
