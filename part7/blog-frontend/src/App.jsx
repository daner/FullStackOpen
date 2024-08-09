import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { clearUser } from './reducers/userReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const createBlogToggleRef = useRef()

    const logout = () => {
        dispatch(clearUser())
    }

    const handleAddedBlog = async () => {
        createBlogToggleRef.current.toggleVisibility()
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
                <CreateBlogForm createHandler={handleAddedBlog} />
            </Togglable>
            <br />
            <BlogList />
        </div>
    )
}

export default App
