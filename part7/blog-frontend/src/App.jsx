import { useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import { useSelector } from 'react-redux'
import { clearUser } from './reducers/userReducer'

const App = () => {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const createBlogToggleRef = useRef()
    const createBlogFormRef = useRef()

    const logout = () => {
        dispatch(clearUser())
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

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification />
                <LoginForm />
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
            <BlogList />
        </div>
    )
}

export default App
