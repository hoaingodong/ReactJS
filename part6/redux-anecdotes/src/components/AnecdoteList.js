import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if ( filter === null ) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.match(filter))
    })

    const byVotes = (b1, b2) => b2.votes - b1.votes

    return (
        anecdotes.sort(byVotes).map(anecdote => <Anecdote anecdote={anecdote}/>)
    )
}

export default AnecdoteList