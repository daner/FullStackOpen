import { useState } from "react"
import loginService from "../services/login"

const LoginForm = ({successCallback, failedCallback}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            const response = await loginService.login({username, password})
            setUsername('')
            setPassword('')
            successCallback(response)
        } catch(error) {
            console.log(error)
            setMessage(error.message)
            setTimeout(() => {
                setMessage(null)
            }, 5000)                
        }
    }

    return(
        <div>
            <h2>log in to application</h2>
            { message ? <div>{message}</div> : <></>}
            <form onSubmit={submitForm}>
                <div><span>username</span> <input value={username} onChange={(event) => setUsername(event.target.value)} /></div>
                <div><span>password</span> <input value={password} onChange={(event) => setPassword(event.target.value)}/></div>
                <div><button>login</button></div>
            </form>
        </div>
    )    
}

export default LoginForm