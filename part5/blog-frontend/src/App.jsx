import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const callback = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if(user === null) {
    return(<div>
      <LoginForm successCallback={callback} />
    </div>)
  }

  return (
    <div>
      <h2>blogs</h2>
      <div className="user">{user.name} logged in <button onClick={logout}>logout</button></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App