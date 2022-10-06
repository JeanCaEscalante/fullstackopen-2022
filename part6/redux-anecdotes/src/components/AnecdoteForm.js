import {connect} from 'react-redux';
import {newAnecdotes} from '../reducers/anecdoteReducer';
import {NotificationChange} from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  const addAnecdotes = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.newAnecdotes(anecdote);
    props.NotificationChange(`created '${anecdote}'`, 10);
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

const mapDispatchToProps = (dispatch) => {
  return {
    newAnecdotes: (value) => {
      dispatch(newAnecdotes(value))
    },
    NotificationChange: (message, time) => {
      dispatch(NotificationChange(message, time))
    }
  }
}


export default connect(null, mapDispatchToProps)(AnecdoteForm);