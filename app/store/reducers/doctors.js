import { createSlice } from '@reduxjs/toolkit';
// import socketClient from '../../services/socket';
import * as actions from '../actions/api';

const slice = createSlice({
  name: 'doctors',
  initialState: {
    loading: false,
    list: [],
    lastFetch: null,
    error: null,
  },
  reducers: {
    doctorsRequested: (doctors) => {
      doctors.loading = true;
      doctors.error = null;
      // socketClient.socket.emit('new-message', 'the message');
    },
    doctorsLoaded: (doctors, action) => {
      doctors.loading = false;
      doctors.error = null;
      doctors.list = action.payload;
    },
    doctorsRequestFailed: (doctors, action) => {
      doctors.loading = false;
      doctors.error = action.payload;
    },
  },
});

const { doctorsLoaded, doctorsRequested, doctorsRequestFailed } = slice.actions;
export default slice.reducer;

export const loadDoctors = () => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: doctorsRequested.type,
      onError: doctorsRequestFailed.type,
      onSuccess: doctorsLoaded.type,
      url: '/doctors',
      method: 'GET',
    }),
  );
};
