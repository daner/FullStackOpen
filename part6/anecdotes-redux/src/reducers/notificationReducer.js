import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { show: false, message: '' },
    reducers: {
        showNotification(state, action) {
            return { show: true, message: action.payload }
        },
        clearNotification(state, action) {
            return { show: false, message: '' }
        }
    }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer