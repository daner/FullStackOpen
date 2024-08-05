import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const loginCallback = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs) 
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if(user === null) {
    return(
    <div>
      <LoginForm successCallback={loginCallback} />
    </div>)
  }

  return (
    <div>
      <h2>blogs</h2>
      <div className="user">{user.name} logged in <button onClick={logout}>logout</button></div>
      <CreateBlogForm />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App