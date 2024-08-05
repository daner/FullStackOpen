import { useState } from 'react'

const Blog = ({ blog, deleteHandler}) => {
  const [showDetails, setShowDetails] = useState(false)

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
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button onClick={() => deleteHandler(blog)}>remove</button>
        </div>
      </div>
    )
  }
}

export default Blog