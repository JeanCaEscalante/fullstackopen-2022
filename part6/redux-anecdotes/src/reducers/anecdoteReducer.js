import AnecdoteService from '../service/anecdotes';

export const newAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdote = await AnecdoteService.create(content);
    dispatch({
      type: 'NEW_ANE',
      data: newAnecdote,
    })
  }
}

export const toggleVoteOf = (id, vote) => {
  return async (dispatch) => {
    const votes = await AnecdoteService.update(id,vote);
    dispatch({
      type: 'VOTE',
      data: votes,
    })
  }
};

export const initializeAnecdotes = () => {
   return async (dispatch) => {
    const anecd = await AnecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECD',
      data: anecd,
    })
   }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const voteToChange = state.find(a => a.id === id);
       const changedVote = {...voteToChange, votes: action.data.votes}
       return state.map(vote =>
        vote.id !== id ? vote : changedVote  
      );
    case 'NEW_ANE':
      return [...state, action.data]
    case 'INIT_ANECD':
      return action.data
    default: return state
  }
}

export default reducer