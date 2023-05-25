import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {createNotification} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(createNotification(`Anecdote ${content} successfully added`))
        setTimeout(() => {
            dispatch(createNotification(null))
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote"/>
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm
