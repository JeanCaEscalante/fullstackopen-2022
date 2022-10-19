import loginService from '../services/login';
import blogService from '../services/blogs';

const loggedUserJSON = JSON.parse(
    window.localStorage.getItem('user'),
  )

  const initialState = loggedUserJSON ? loggedUserJSON : null

export const login  = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials);
        blogService.setToken(user.token)
        dispatch({
            type: 'signIn',
            data: user,
        })
    } 
};

export const logout = () => {
    return {
        type: 'logout'
    }
}

const loginRedux = (state = initialState, action) => {
    switch (action.type) {
        case 'signIn':
            localStorage.setItem('user',  JSON.stringify(action.data))
            return action.data;
        case 'logout':
            localStorage.removeItem('user')
            return null
        default:
            return state
    }
}

export default loginRedux;