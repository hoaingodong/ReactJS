import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            const votedAnecdote = state.find(anecdote => anecdote.id === id)
            const changedAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }

            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
    return async dispatch =>
    {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content =>{
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}


export default anecdoteSlice.reducer