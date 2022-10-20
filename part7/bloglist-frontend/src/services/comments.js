import request from './config';

const url = '/api/comments';


const getById = async (id) => {
  const res = await request.get(`${url}/`,id);
  return res.data;
}

const create = async (newObject) => {
  const res = await request.post(url,newObject);
  return res.data;
}

export default { getById, create }