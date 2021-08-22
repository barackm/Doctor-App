import {
  API_CALL_BEGAN,
  DOCTORS_LOADED_ERROR,
  DOCTORS_LOADED_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGOUT_USER_SUCCESS,
} from './actionTypes';

export const apiCallBegan = () => ({
  type: API_CALL_BEGAN,
});

export const doctorsLoadedSuccess = (doctors) => ({
  type: DOCTORS_LOADED_SUCCESS,
  payload: doctors,
});

export const doctorsLoadedError = (error) => ({
  type: DOCTORS_LOADED_ERROR,
  payload: error,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

export const signupUserSuccess = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

export const signupUserFailure = (error) => ({
  type: SIGNUP_USER_ERROR,
  payload: error,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});
