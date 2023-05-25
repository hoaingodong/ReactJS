import {createSlice} from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push(action.payload)
        },
        vote(state, action) {
            const id = action.payload
            const votedAnecdote = state.find(anecdote => anecdote.id === id)
            const changedAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }

            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer