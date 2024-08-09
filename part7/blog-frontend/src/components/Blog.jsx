import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)
    const [comment, setComment] = useState('')

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (updatedBlog) => {
            queryClient.setQueryData(['blogs', id], updatedBlog)
            dispatch(
                showNotification(
                    `Blog ${updatedBlog.title} was liked`,
                    false,
                    5,
                ),
            )
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.remove,
        onSuccess: (deletedBlog) => {
            dispatch(
                showNotification(
                    `Blog ${deletedBlog.title} was deleted`,
                    false,
                    5,
                ),
            )
            navigate('/')
        },
    })

    const result = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => blogService.getById(id),
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div className="mt-8">Loading blog...</div>
    }

    if (result.isError) {
        return <div className="mt-8">Failed to fetch blog data</div>
    }

    const blog = result.data

    const likeBlog = async () => {
        updateBlogMutation.mutate({ id: blog.id, likes: blog.likes + 1 })
    }

    const deleteBlog = async () => {
        if (window.confirm('Sure?')) {
            deleteBlogMutation.mutate({
                blog: { id: blog.id },
                token: currentUser.token,
            })
        }
    }

    const addComment = async () => {
        try {
            const result = await blogService.createComment(blog.id, {
                text: comment,
            })
            const blogdata = queryClient.getQueryData(['blogs', id])
            blogdata.comments.push(result)
            queryClient.setQueryData(['blogs', id], blogdata)
            setComment('')
        } catch (error) {
            dispatch(showNotification(`Failed to add comment`, true, 5))
        }
    }

    return (
        <div className="mt-8">
            <div className="text-2xl mb-2">
                {blog.title} by {blog.author}
            </div>
            <div className="mb-2">{blog.url}</div>
            <div className="mb-2">
                likes {blog.likes}{' '}
                <button className="btn btn-blue" onClick={likeBlog}>
                    like
                </button>
            </div>
            <div>added by {blog.user.name}</div>
            {currentUser.username === blog.user.username ? (
                <div>
                    <button className="btn btn-blue" onClick={deleteBlog}>
                        remove
                    </button>
                </div>
            ) : (
                <></>
            )}
            <div>
                <div className="text-lg mt-12">comments</div>
                <div className="mt-2 mb-2">
                    <input
                        className="px-1.5 py-0.5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="rounded bg-gray-200 hover:bg-gray-400 px-1.5 py-0.5"
                        onClick={addComment}
                    >
                        add comment
                    </button>
                </div>
                <ul className="list-disc list-inside">
                    {blog.comments.map((comment) => (
                        <li key={comment.id}>{comment.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blog
