import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useField} from '../hooks/useField';
import { newComment } from '../reducers/blogsReducer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const CommentsForm = () => {

    const { id } = useParams()
    const comment = useField('text');
    const dispatch = useDispatch();
  
    const addComment = (event) => {
      event.preventDefault();
  
      const new_Comment = {
        content: comment.value,
        idBlog: id,
      }

      dispatch(newComment(new_Comment))

      comment.onReset();
    };
  
    return (
        <>
        <h2>Create New</h2>
        <form className='form-comments' id='blog-form' onSubmit={addComment}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...comment}
            label="Comment"
          />
          <div>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
           Save
          </Button>
          </div>
        </form>
        </>
      )
}

export default CommentsForm