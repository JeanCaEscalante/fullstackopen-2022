import loginService from '../services/login';

export const login  = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials);
        dispatch({
            type: 'signIn',
            data: user,
        })
    } 
};

const userRedux = (state = null, action) => {
    switch (action.type) {
        case 'signIn':
            localStorage.setItem('user', action.data)
            return action.data;
        case 'logout':
            return null
        default:
            return state
    }
}

export default userRedux;