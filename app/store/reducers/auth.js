import { createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import storage from '../../auth/storage';
import * as actions from '../actions/api';

const slice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    currentUser: null,
    isAuthenticated: false,
    error: null,
    toke: null,
  },
  reducers: {
    authRequested: (auth) => {
      auth.loading = true;
      auth.error = null;
    },
    userLoggedin: (auth, action) => {
      auth.loading = false;
      auth.currentUser = action.payload.data;
      auth.token = action.payload.token;
      auth.isAuthenticated = true;
      Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'Welcome to My Doctor App 👋',
      });
    },
    userLoginFailed: (auth, action) => {
      auth.isAuthenticated = false;
      auth.loading = false;
      auth.error = action.payload;
      auth.currentUser = null;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: action.payload,
      });
    },
    userLoggedOut: (auth) => {
      auth.isAuthenticated = false;
      auth.currentUser = null;
    },
    userSignedup: (auth, action) => {
      auth.loading = false;
      auth.currentUser = action.payload.data;
      auth.token = action.payload.token;
      auth.isAuthenticated = true;
      Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'Welcome to My Doctor App 👋',
      });
    },
    userSignupFailed: (auth, action) => {
      auth.isAuthenticated = false;
      auth.loading = false;
      auth.error = action.payload;
      auth.currentUser = null;
    },
  },
});

const {
  authRequested,
  userLoggedin,
  userLoginFailed,
  userSignedup,
  userSignupFailed,
  userLoggedOut,
} = slice.actions;
export default slice.reducer;

export const loginUser = (user) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: authRequested.type,
      onError: userLoginFailed.type,
      onSuccess: userLoggedin.type,
      url: '/auth',
      method: 'POST',
      data: user,
    }),
  );
};

export const signupUser = (user) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: authRequested.type,
      onError: userSignupFailed.type,
      onSuccess: userSignedup.type,
      url: '/users',
      method: 'POST',
      data: user,
    }),
  );
};

export const logoutUser = () => (dispatch) => {
  storage.removeAuthToken().then(() => {
    dispatch({ type: userLoggedOut.type });
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'Logged out successfully  👋',
    });
  });
};
