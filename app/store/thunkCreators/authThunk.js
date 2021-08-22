import { Alert } from 'react-native';
import {
  apiCallBegan,
  loginUserFailure,
  loginUserSuccess,
  logoutUserSuccess,
} from '../actions/actionCreators';
import axios from 'axios';
import storage from '../../auth/storage';

const apiEndPoint = 'https://aqueous-gorge-50977.herokuapp.com/api';

export const loginUserAsync = (user) => async (dispatch) => {
  dispatch(apiCallBegan());
  try {
    const response = await axios.post(`${apiEndPoint}/auth`, user);
    dispatch(loginUserSuccess(response.data));
    const authToken = response.headers['x-auth-token'];
    await storage.setAuthToken(authToken);
  } catch (error) {
    Alert.alert(error.message);
    dispatch(loginUserFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  console.log('trying to logout...');
  await storage.removeAuthToken();
  console.log(await storage.getAuthToken());
  dispatch(logoutUserSuccess());
};
