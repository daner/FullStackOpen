import { createSlice } from '@reduxjs/toolkit'

const storageKey = "BLOGLIST_USER"

const getInitialState = () => {
    const item = window.localStorage.getItem(storageKey)
    if(item !== null && item !== undefined) {
        return JSON.parse(item)
    }
    return null
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser(state, action) {
            window.localStorage.setItem(storageKey, JSON.stringify(action.payload))
            return action.payload
        },
        clearUser(state, action) {
            window.localStorage.removeItem(storageKey)
            return null
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
