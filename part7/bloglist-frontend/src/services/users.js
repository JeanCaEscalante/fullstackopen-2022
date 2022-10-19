import request from './config';

const url = '/api/users';

const getAll = async () => {
  const res = await request.get(url);
  return res.data;
}


export default { getAll }