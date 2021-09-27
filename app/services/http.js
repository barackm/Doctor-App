import axios from 'axios';
import storage from '../auth/storage';

const getAuthToken = async () => {
  const token = await storage.getAuthToken();
  axios.defaults.headers.common['x-auth-token'] = token;
};
getAuthToken();
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('An unexpected error occurred.');
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  request: axios.request,
};

export default http;
