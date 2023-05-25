import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {createNotification} from "../reducers/notificationReducer";

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => {
                    dispatch(vote(anecdote.id))
                    dispatch(createNotification(`you voted ${anecdote.content}`))
                    setTimeout(() => {
                        dispatch(createNotification(null))
                    }, 5000)
                }}>vote
                </button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === null) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.match(filter))
    })

    const anecs = [...anecdotes]

    const byVotes = (b1, b2) => b2.votes - b1.votes

    return (
        anecs.sort(byVotes).map(anecdote => <Anecdote anecdote={anecdote}/>)
    )
}

export default AnecdoteList