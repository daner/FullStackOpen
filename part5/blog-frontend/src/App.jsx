import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

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

  const setNotification = (message) => {
    setMessage(message)
    setError(false)
    setTimeout(() => {
     setMessage(null)
    }, 3000)
  }

  const handleError = (error) => {
     setMessage(error)
     setError(true)
     setTimeout(() => {
      setMessage(null)
     }, 3000)
  }

  const handleAddedBlog = (addedBlog) => {
    setNotification(`${addedBlog.title} by ${addedBlog.author} added to blogs`)
    setBlogs([...blogs, addedBlog])
  }
  
  const deleteHandler = async (blog) => {
    try  {
      const deletedBlog = await blogService.remove(blog, user.token)
      setNotification(`${deletedBlog.title} by ${deletedBlog.author} removed from blogs`)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
    } catch (error) {
      console.log(error)
      handleError(error.message)
    }
  }


  useEffect(() => {
    fetchBlogs()
  }, [])

  if(user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notification message={message} error={error} />
        <LoginForm successCallback={loginCallback} errorCallback={handleError} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
      <div className="user">{user.name} logged in <button onClick={logout}>logout</button></div>
      <CreateBlogForm user={user} successCallback={handleAddedBlog} errorCallback={handleError} />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteHandler={deleteHandler} />
      )}
    </div>
  )
}

export default App