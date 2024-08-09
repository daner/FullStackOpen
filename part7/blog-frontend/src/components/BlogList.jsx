import blogService from '../services/blogs'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const createBlogToggleRef = useRef()

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>Failed to fetch blog data</div>
    }

    const handleAddedBlog = async () => {
        createBlogToggleRef.current.toggleVisibility()
    }

    const blogs = result.data

    return (
        <div>
            <h2 className="text-2xl mb-4">blogs</h2>
            <div className="mt-4 mb-4">
                <Togglable buttonLabel="new blog" ref={createBlogToggleRef}>
                    <CreateBlogForm createHandler={handleAddedBlog} />
                </Togglable>
            </div>
            {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                    <div key={blog.id} className="border-2 px-4 py-2 mt-2">
                        <Link to={`/blogs/${blog.id}`}>
                            <span>{blog.title}</span>
                        </Link>{' '}
                        by <span>{blog.author}</span>
                    </div>
                ))}
        </div>
    )
}

export default BlogList
