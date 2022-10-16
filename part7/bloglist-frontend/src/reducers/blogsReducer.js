import blogsService from '../services/blogs';

export const initAll = () => {
   return async (dispatch) => {
        const blogs = await blogsService.getAll();
        dispatch({
            type: 'INIT_ALL',
            data: blogs,
        });
   }
}; 

export const newBlog = (newObject) => {
    return async (dispatch) => {
        const createBlog = await blogsService.create(newObject);
        dispatch({
            type: 'NEW_BLOG',
            data: createBlog
        })
    }
}

const blogsRedux = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ALL':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        default: return state
    }
};

export default blogsRedux;