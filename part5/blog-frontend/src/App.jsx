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
  
  const deleteHandler = async (blog) => {
    try  {
      const deletedBlog = await blogService.remove(blog, user.token)
      setNotification(`${deletedBlog.title} by ${deletedBlog.author} removed from blogs`)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
    } catch (error) {
      console.log(error)
      handleError(error.response.data.error)
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
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlogForm user={user} createBlog={handleAddedBlog} handleError={handleError} />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteHandler={deleteHandler} />
      )}
    </div>
  )
}

export default App