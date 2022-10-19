import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsRedux from './reducers/blogsReducer';
import loginRedux from './reducers/loginReducer';
import usersRedux from './reducers/usersReducer';

const reducer = combineReducers({
    blogs:blogsRedux,
    user: loginRedux,
    users: usersRedux,
})

const store = createStore(
    reducer,
      applyMiddleware(thunk)
  )
  

export default store;