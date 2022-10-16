import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id)) 
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div>Author: {anecdote.author}</div>
      <div>Info: {anecdote.info}</div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  )
}

export default Anecdote
