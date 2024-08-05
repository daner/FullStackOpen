import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler, errorHandler }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            const response = await loginService.login({ username, password })
            setUsername('')
            setPassword('')
            loginHandler(response)
        } catch (error) {
            errorHandler('Wrong username or password')
        }
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div><span>username</span> <input value={username} onChange={(event) => setUsername(event.target.value)} /></div>
                <div><span>password</span> <input value={password} onChange={(event) => setPassword(event.target.value)} /></div>
                <div><button>login</button></div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    loginHandler: PropTypes.func.isRequired,
    errorHandler: PropTypes.func.isRequired
}

export default LoginForm