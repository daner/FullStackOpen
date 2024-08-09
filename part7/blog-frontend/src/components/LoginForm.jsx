import { useState } from 'react'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUsername('')
            setPassword('')
            dispatch(setUser(user))
            
        } catch (error) {
            dispatch(showNotification('Wrong username or password', true, 5))
        }
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <span>username</span>{' '}
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        data-testid="username-input"
                    />
                </div>
                <div>
                    <span>password</span>{' '}
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        data-testid="password-input"
                    />
                </div>
                <div>
                    <button>login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
