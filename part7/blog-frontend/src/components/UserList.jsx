import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAll,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>Failed to fetch blog data</div>
    }

    const users = result.data

    return (
        <div>
            <h2 className="text-2xl mb-4">users</h2>
            <table className="table-auto divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            blogs created
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.blogs.length} blogs
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
