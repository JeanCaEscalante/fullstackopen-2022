import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsRedux from './reducers/blogsReducer';
import userRedux from './reducers/userReducer';

const reducer = combineReducers({
    blogs:blogsRedux,
    user: userRedux
})

const store = createStore(
    reducer,
      applyMiddleware(thunk)
  )
  

export default store;