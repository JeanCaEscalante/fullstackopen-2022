import {useDispatch} from 'react-redux'
import {newAnecdotes} from '../reducers/anecdoteReducer';
import { NotificationChange } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch();


  const addAnecdotes = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(newAnecdotes(anecdote));
    dispatch(NotificationChange(`created '${anecdote}'`, 10));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;