import * as actions from '../actions/api';
import http from '../../services/http';
import storage from '../../auth/storage';
const baseURL = 'https://aqueous-gorge-50977.herokuapp.com/api';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { onStart, onError, onSuccess, data, method, url } = action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const response = await http.request({
        baseURL,
        url,
        data,
        method,
      });
      if (
        onSuccess &&
        (onSuccess === 'auth/userLoggedin' || onSuccess === 'auth/userSignedup')
      ) {
        dispatch({ type: onSuccess, payload: response.data });
        const authToken = response.headers['x-auth-token'];
        await storage.setAuthToken(authToken);
      } else {
        onSuccess
          ? dispatch({ type: onSuccess, payload: response.data })
          : dispatch(actions.apiCallSucceeded(response.data));
      }
    } catch (error) {
      console.log();
      onError
        ? dispatch({
            type: onError,
            payload: error.response.data || error.message,
          })
        : dispatch(actions.apiCallFailed(error.response.data || error.message));
    }
  };

export default api;
