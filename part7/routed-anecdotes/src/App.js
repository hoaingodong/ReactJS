import { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route, Link,
} from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Menu from "./components/Menu";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
      setNotification(`${anecdote.content} created successfully !`)
      setTimeout(() => {
          setNotification(null)
      }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <Router>
          <h1>Software anecdotes</h1>
          <Menu></Menu>

          <Routes>
              <Route path="/create" element={<CreateNew addNew={addNew} />} />
              <Route path="/" element = {<AnecdoteList anecdotes={anecdotes} notification={notification}/>}/>
              <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
              <Route path="/about" element={<About />} />

          </Routes>

          <Footer />
      </Router>
  )
}

export default App
