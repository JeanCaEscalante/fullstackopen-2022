import {connect} from 'react-redux';
import {toggleVoteOf} from '../reducers/anecdoteReducer';
import {NotificationChange} from '../reducers/notificationReducer';

const AnecdoteList = (props) => {

  const vote = (element) => {
    const updateVote = {...element, votes: element.votes + 1}
    props.toggleVoteOf(element.id, updateVote);
    props.NotificationChange(`you voted '${element.content}'`, 10);
  }

  return (
    <div>
      {props.anecdotes.sort((a,b) => a.votes > b.votes  ? -1 : 0).map(anecdote =>
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

const mapStateToProps  = (state) => {

  return {
    anecdotes: (state.filter  === 'ALL') 
    ? state.anecdotes
    : state.anecdotes.filter(anecdote => anecdote.content.match(state.filter)),
  }
}

const mapDispatchToProps = {
  toggleVoteOf, NotificationChange
}
const ConnectedAnecdote = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdote