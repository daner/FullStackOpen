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

  const createBlogRef = useRef()

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

    if(!error) {
      error = "something went wrong"
    }

     setMessage(error)
     setError(true)
     setTimeout(() => {
      setMessage(null)
     }, 6000)
  }

  const handleAddedBlog = (addedBlog) => {
    setNotification(`${addedBlog.title} by ${addedBlog.author} added to blogs`)
    createBlogRef.current.toggleVisibility()
    setBlogs([...blogs, addedBlog])
  }
  
  const handleDeleteBlog = async (blog) => {
    setNotification(`${deletedBlog.title} by ${deletedBlog.author} removed from blogs`)
    setBlogs([...blogs.filter(blog => blog.id !== deletedBlog.id)])
  }

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs([...blogs.filter(blog => blog.id !== updatedBlog.id), updatedBlog])
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if(user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notification message={message} error={error} />
        <LoginForm loginHandler={handleLogin} errorHandler={handleError} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
      <div className="user">{user.name} logged in <button onClick={logout}>logout</button></div>
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlogForm user={user} createHandler={handleAddedBlog} errorHandler={handleError} />
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => a.likes > b.likes ? -1 : 1)
        .map(blog =>
          <Blog key={blog.id} user={user} blog={blog} deleteHandler={handleDeleteBlog} updateHandler={handleUpdateBlog} errorHandler={handleError} />
      )}
    </div>
  )
}

export default App