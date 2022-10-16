import request from './config';

const url = '/api/blogs';

const getAll = async () => {
  const res = await request.get(url);
  return res.data;
}

const getById = async (id) => {
  const res = await request.get(`${url}/`,id);
  return res.data;
}

const create = async (newObject) => {
  const res = await request.post(url,newObject);
  return res.data;
}

const update = async () => {

}

const remove = async () => {

}


export default { getAll, getById, create }