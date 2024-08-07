import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            return state.map(item => 
                item.id !== action.payload.id ? item : action.payload
            )
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }

    }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const voteOn = anectdote => {
    return async dispatch => {
        const anecdoteToUpdate = {...anectdote, votes: anectdote.votes + 1}
        const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate)
        dispatch(updateAnecdote(updatedAnecdote))
        dispatch(setNotification(`you voted on ${updatedAnecdote.content}`, 5))
    }
}

export const initalizeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote  = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(anecdote))
        dispatch(setNotification(`you added ${anecdote.content}`, 5))
    }
}


export default anecdoteSlice.reducer