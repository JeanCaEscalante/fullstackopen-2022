import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

 const UserPage = () => {
    const users = useSelector((state) => state.users)
    const { id } = useParams()
    const user = users.find((user) => user.id === id)
  
    return (
        <>
        <h3>{user.name}</h3>
        <h5>Added Blogs</h5>
        {user.blogs.map((blog) => <h3>{blog.title}</h3>)}
        </>
    )
}

export default UserPage;