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

    const addComment = async (event) => {
        event.preventDefault()
        try {
            const result = await blogService.createComment(
                blog.id,
                {
                    text: comment,
                },
                currentUser.token,
            )
            const blogdata = queryClient.getQueryData(['blogs', id])
            blogdata.comments.push(result)
            queryClient.setQueryData(['blogs', id], blogdata)
            setComment('')
        } catch (error) {
            dispatch(showNotification(`Failed to add comment`, true, 5))
        }
    }

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="mt-8">
            <div className="text-2xl mb-2">
                {blog.title} by {blog.author}
            </div>
            <div className="mb-2">{blog.url}</div>
            <div className="mb-2">
                likes {blog.likes}{' '}
                <button className="btn" onClick={likeBlog}>
                    like
                </button>
            </div>
            <div>added by {blog.user.name}</div>
            {currentUser.username === blog.user.username ? (
                <div>
                    <button className="btn" onClick={deleteBlog}>
                        remove
                    </button>
                </div>
            ) : (
                <></>
            )}
            <div className="max-w-96">
                <div>
                    <div className="text-lg mt-12 mb-4">comments</div>
                    <ul className="space-y-6">
                        {blog.comments.map((comment, index) => (
                            <li
                                className="relative flex gap-x-4"
                                key={comment.id}
                            >
                                <div
                                    className={classNames(
                                        index === blog.comments.length - 1
                                            ? 'h-6'
                                            : '-bottom-6',
                                        'absolute left-0 top-0 flex w-6 justify-center',
                                    )}
                                >
                                    <div className="w-px bg-gray-200" />
                                </div>

                                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                </div>
                                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                    <div className="flex justify-between gap-x-4">
                                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                                            <span className="font-medium text-gray-900">
                                                {comment.user}
                                            </span>{' '}
                                            commented
                                        </div>
                                        <time
                                            dateTime={comment.date}
                                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                        >
                                            {new Date(
                                                comment.date,
                                            ).toDateString()}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-6 text-gray-500">
                                        {comment.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex gap-x-3">
                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                    </div>
                    <form
                        action="#"
                        className="relative flex-auto ml-1.5"
                        onSubmit={addComment}
                    >
                        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={2}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add your comment..."
                                className="block w-full resize-none border-0 bg-transparent px-2.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                            <div className="flex space-x-5">
                                <button
                                    type="submit"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Blog
