import { useSelector, useDispatch } from 'react-redux'
import {toggleVoteOf} from '../reducers/anecdoteReducer';
import {NotificationChange} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter  === 'ALL' 
    ? state.anecdotes
    : state.anecdotes.filter(anecdote => anecdote.content.match(state.filter))
  
  })
  const dispatch = useDispatch();

  const vote = (element) => {
    const updateVote = {...element, votes: element.votes + 1}
    dispatch(toggleVoteOf(element.id, updateVote));
    dispatch(NotificationChange(`you voted '${element.content}'`, 10))
  }


  return (
    <div>
      {anecdotes.sort((a,b) => a.votes > b.votes  ? -1 : 0).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList