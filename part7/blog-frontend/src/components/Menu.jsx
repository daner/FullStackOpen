import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'

const Menu = () => {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearUser())
    }

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex gap-x-12">
                    <Link to="/">
                        <span className="text-sm font-semibold leading-6 text-gray-900">
                            blogs
                        </span>
                    </Link>
                    <Link to="/users">
                        <span className="text-sm font-semibold leading-6 text-gray-900">
                            users
                        </span>
                    </Link>
                </div>
                <div className='flex text-sm'>
                    {user.name}
                    <button className="ml-4 bg-gray-200 rounded px-2 py-0.5 hover:bg-gray-400" onClick={logout}>
                        logout
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Menu
