import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
    const user = useSelector((state) => state.user)

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
            <Menu />
            <div className="container mx-auto">
                <Notification />
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
