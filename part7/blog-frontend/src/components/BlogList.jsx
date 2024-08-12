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
        <>
            <div>
                <h2 className="text-2xl mb-4">blogs</h2>
                <div className="mt-4 mb-4">
                    <Togglable buttonLabel="new blog" ref={createBlogToggleRef}>
                        <CreateBlogForm createHandler={handleAddedBlog} />
                    </Togglable>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Author
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {blogs
                                        .sort((a, b) =>
                                            a.likes > b.likes ? -1 : 1,
                                        )
                                        .map((blog) => (
                                            <tr key={blog.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    <Link
                                                        to={`/blogs/${blog.id}`}
                                                    >
                                                        <span>
                                                            {blog.title}
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {blog.author}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogList
