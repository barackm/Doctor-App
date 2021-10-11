import * as actions from '../actions/api';
import http from '../../services/http';
import storage from '../../auth/storage';
import * as SecureStore from 'expo-secure-store';

const baseURL = 'http://192.168.1.69:5000/api';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { onStart, onError, onSuccess, data, method, url, token } =
      action.payload;

    if (onStart) dispatch({ type: onStart });
    try {
      const response = await http.request({
        baseURL,
        url,
        data,
        method,
        headers: {
          'x-auth-token':
            token || (await SecureStore.getItemAsync('authToken')),
        },
      });

      if (
        onSuccess &&
        (onSuccess === 'auth/userLoggedin' || onSuccess === 'auth/userSignedup')
      ) {
        const authToken = response.headers['x-auth-token'];
        setAuthToken(authToken);
        dispatch({
          type: onSuccess,
          payload: { data: response.data, token: authToken },
        });
      } else {
        onSuccess
          ? dispatch({ type: onSuccess, payload: response.data })
          : dispatch(actions.apiCallSucceeded(response.data));
      }
    } catch (error) {
      onError
        ? dispatch({
            type: onError,
            payload:
              (error.response && error.response.data) ||
              'There was a server error',
          })
        : dispatch(
            actions.apiCallFailed(
              (error.response && error.response.data) ||
                'There was a server error',
            ),
          );
    }
  };

const setAuthToken = async (token) => {
  await SecureStore.setItemAsync('authToken', token);
};

export default api;
