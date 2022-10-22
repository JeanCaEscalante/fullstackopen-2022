import request from './config';
const url = '/api/login'

const login = async (credentials) => {
  const response = await request.post(url, credentials);
  return response.data;
};

export default {login};
