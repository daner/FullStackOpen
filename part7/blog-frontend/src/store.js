import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
    reducer: {
        notification: notificationReducer,
        user: userReducer
    }
})