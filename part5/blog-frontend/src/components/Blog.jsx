const Blog = ({ blog, deleteHandler}) => {
  return(
    <div>
      {blog.title} {blog.author} <button onClick={() => deleteHandler(blog)}>delete</button>
    </div> 
  ) 
}

export default Blog