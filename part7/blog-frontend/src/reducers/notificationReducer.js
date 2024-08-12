import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { show: false, message: '' , error: false },
    reducers: {
        setNotification(state, action) {
            return { show: true, message: action.payload.message, error: action.payload.error }
        },
        clearNotification(state, action) {
            return { show: false, message: '', error: false }
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

let timer

export const showNotification = (message, error, timeout) => {
    return async dispatch => {
        dispatch(setNotification({ message, error}))
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer