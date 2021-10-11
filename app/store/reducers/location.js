import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

import * as actions from '../actions/api';

const url = '/emergencies';
const slice = createSlice({
  name: 'location',
  initialState: {
    mergency: null,
    loading: false,
    error: null,
  },
  reducers: {
    sendingLocation: (location) => {
      location.loading = true;
      location.error = null;
    },
    locationSet: (location, action) => {
      location.error = null;
      location.loading = false;
      location.mergency = action.payload;

      Alert.alert(
        'Emergency',
        'The emergency was successfully sent to the Hospital, Please do not go far from your current location.',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
    },
    sendingLocationFailed: (location, action) => {
      location.error = action.payload;
      location.loading = false;
      Alert.alert(
        'Sorry Emergency was not sent',
        action.payload,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
    },
  },
});

export default slice.reducer;
const { locationSet, sendingLocation, sendingLocationFailed } = slice.actions;

export const sendLocation = (location) => (dispatch) => {
  console.log(location);
  dispatch(
    actions.apiCallBegan({
      onStart: sendingLocation.type,
      onSuccess: locationSet.type,
      onError: sendingLocationFailed.type,
      data: { location },
      url,
      method: 'POST',
    }),
  );
};
