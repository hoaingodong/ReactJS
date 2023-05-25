import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {useEffect} from "react"
import noteAnecdote from './services/anecdotes'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        noteAnecdote
            .getAll().then(notes => dispatch(setAnecdotes(notes)))
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification></Notification>
            <Filter></Filter>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App