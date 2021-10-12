import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/api';

const url = '/tests';

const slice = createSlice({
  name: 'tests',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    testsRequested: (tests) => {
      tests.loading = true;
      tests.error = null;
    },
    testsReceived: (tests, action) => {
      tests.list = action.payload;
      tests.loading = false;
    },
    testAdded: (tests, action) => {
      const newTests = [action.payload, ...tests.list];
      tests.list = newTests;
    },
    testsRequestFailed: (tests, action) => {
      tests.error = action.payload;
      tests.loading = false;
    },
    testRemoved: (tests, action) => {
      tests.list = tests.list.filter((test) => test._id !== action.payload._id);
    },
  },
});

export default slice.reducer;

const { testsRequested, testRemoved, testsReceived, testsRequestFailed } =
  slice.actions;

export const loadTests = (id) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      url: id ? `${url}/patient/${id}` : url,
      onStart: testsRequested.type,
      onSuccess: testsReceived.type,
      onError: testsRequestFailed.type,
    }),
  );
};

export const removeTest = (id) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      url: `${url}/${id}`,
      method: 'DELETE',
      onSuccess: testRemoved.type,
    }),
  );
};
