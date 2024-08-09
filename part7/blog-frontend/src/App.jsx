import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearUser())
    }

    if (user === null) {
        return (
            <div className="container mx-auto">
                <h2 className="text-2xl mb-4">log in to application</h2>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <Router>
            <div className="container mx-auto">
                <h2 className="text-2xl mb-4">blogs</h2>
                <Notification />
                <div className="user">
                    {user.name} logged in{' '}
                    <button className="btn btn-blue" onClick={logout}>
                        logout
                    </button>
                </div>
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/blogs/:id" element={<Blog />} />

                </Routes>
            </div>
        </Router>
    )
}

export default App
