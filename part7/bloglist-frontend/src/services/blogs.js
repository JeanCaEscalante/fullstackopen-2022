import request from './config';

const url = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await request.get(url);
  return res.data;
}

const getById = async (id) => {
  const res = await request.get(`${url}/`,id);
  return res.data;
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await request.post(url,newObject, config);
  return res.data;
}

const update = async (id,putObject) => {
  const response = await request.put(`${url}/${id}`, putObject);
  return response.data;
}

const remove = async (id) => {
  const config = {
    headers: {Authorization: token},
  };
  const response = await request.delete(`${url}/${id}`, config);
  return response.data;
}


export default { getAll, getById, create, update, remove, setToken }