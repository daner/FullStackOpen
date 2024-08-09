import Blog from './Blog'
import blogService from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const BlogList = () => {
    const queryClient = useQueryClient()

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

    const blogs = result.data

    return (
        <div>
            {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                ))}
        </div>
    )
}

export default BlogList
