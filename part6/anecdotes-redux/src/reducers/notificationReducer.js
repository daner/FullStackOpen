import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { show: false, message: '' },
    reducers: {
        setNotification(state, action) {
            return { show: true, message: action.payload }
        },
        removeNotification(state, action) {
            return { show: false, message: '' }
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer