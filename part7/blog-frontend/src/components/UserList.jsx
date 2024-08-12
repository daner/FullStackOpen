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
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Blogs created
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList
