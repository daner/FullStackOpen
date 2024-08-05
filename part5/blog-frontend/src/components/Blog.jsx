import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blog, updateHandler, deleteHandler, handleError}) => {
  const [showDetails, setShowDetails] = useState(false)


  const likeBlog = async () => {
    try {
      const updatedBlog = await blogService.update({id: blog.id, likes: blog.likes + 1}, user.token)
      updateHandler(updatedBlog)
    } catch (error) {
      handleError(error.response.data.error)
    }
  }

  const deleteBlog = async () => {
    if(window.confirm("do you want to delete blog?")) {
      try  {
        const deletedBlog = await blogService.remove(blog, user.token)
        deleteHandler(deletedBlog)
      } catch (error) {
        handleError(error.response.data.error)
      }
    }
  }


  if(!showDetails) {
    return(
      <div className="blog">
        {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
      </div> 
    ) 
  }
  else {
    return(
      <div className="blog">
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    )
  }
}

export default Blog