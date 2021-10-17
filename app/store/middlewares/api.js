import * as actions from '../actions/api';
import http from '../../services/http';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const baseURL = 'http://192.168.1.65:5000/api';
// https://aqueous-gorge-50977.herokuapp.com
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
        const authToken = response.data;
        setAuthToken(authToken);
        dispatch({
          type: onSuccess,
          payload: { data: jwtDecode(authToken) },
        });
      } else {
        onSuccess
          ? dispatch({ type: onSuccess, payload: response.data })
          : dispatch(actions.apiCallSucceeded(response.data));
      }
    } catch (error) {
      console.log(error.response);
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
