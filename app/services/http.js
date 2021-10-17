import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('An unexpected error occurred:', error);
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
