import Blog from './Blog'
import blogService from '../services/blogs'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

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
            <div className="mt-4 mb-4">
                <Togglable buttonLabel="new blog" ref={createBlogToggleRef}>
                    <CreateBlogForm createHandler={handleAddedBlog} />
                </Togglable>
            </div>
            {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    )
}

export default BlogList
