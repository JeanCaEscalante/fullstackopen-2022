import usersService from '../services/users'

export const initUsers = () => {
    return async (dispatch) => {
         const users = await usersService.getAll();
         dispatch({
             type: 'INIT_USERS',
             data: users,
         });
    }
 }; 

 const usersRedux = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        default: return state
    }
};

export default usersRedux;