import blogsService from '../services/blogs';
import comments from '../services/comments';
import commentsService from '../services/comments'

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

export const toggleLikeOf = (id,object) => {
    return async (dispatch) => {
        const newLike = await blogsService.update(id,object);
       dispatch({
            type: 'NEW_LIKE',
            data: object.id
        }) 
    }
}

export const toggleDeleteOf = (id) => {
    return async (dispatch) => {
       await blogsService.remove(id);
       dispatch({
            type: 'DELETE',
            data: id
        }) 
    }
}

export const updateComments = (id) => {
    return async (dispatch) => {
       await blogsService.remove(id);
       dispatch({
            type: 'DELETE',
            data: id
        }) 
    }
}

export const newComment = (newObject) => {
    return async (dispatch) => {
        const createComment = await commentsService.create(newObject);
        dispatch({
            type: 'NEW_COMMENT',
            data: createComment
        })
    }
}

const blogsRedux = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ALL':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'NEW_LIKE':
           return state.map((blog) => (blog.id !== action.data) 
                ? blog : {
                    ...blog,
                    likes: blog.likes + 1,
                }
            )
        case 'DELETE':
            return state.filter((blog) => blog.id !== action.data)
        case 'NEW_COMMENT':
            const id  = action.data.blog;
            const blog = state.find(a => a.id === id)
            const newBlogs = {...blog, comments: [...blog.comments, action.data]}
            return state.map(blog => blog.id !== id ? blog : newBlogs)
        default: return state
    }
};

export default blogsRedux;