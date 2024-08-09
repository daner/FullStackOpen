import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const result = useQuery({
        queryKey: ['users', id],
        queryFn: () => usersService.getById(id),
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div className='mt-8'>Loading user...</div>
    }

    if (result.isError) {
        return <div className='mt-8'>Failed to fetch user data</div>
    }

    const user = result.data
   
    return (
        <div className='mt-8'>
            <h2 className='text-2xl'>{user.name}</h2>
            <h4 className='text-lg mt-4'>added blogs</h4>
            <ul className='list-disc list-inside'>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
