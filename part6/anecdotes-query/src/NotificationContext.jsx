import { createContext, useReducer } from "react";

const initialState = { show: false, message: '' }

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return { show: true, message: action.payload }
        case 'CLEAR':
            return { show: false, message: '' }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notficationDispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={[notification, notficationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const showNotification = (dispatch, message, timeout) => {
    dispatch({ type: 'SHOW', payload: message })
    setTimeout(() => {
        dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
}

export default NotificationContext