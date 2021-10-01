import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/api';
import { addMessageToStore } from '../reducerFunctions/conversationFunctions';

const url = 'conversations';

const slice = createSlice({
  name: 'conversations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    conversationsRequest: (conversations) => {
      conversations.loading = true;
      conversations.error = null;
    },
    conversationsReceived: (conversations, action) => {
      conversations.loading = false;
      conversations.error = null;
      conversations.list = action.payload;
    },
    newMessageAdded: (conversations, action) => {
      addMessageToStore(conversations, action.payload);
      conversations.loading = false;
      conversations.error = null;
    },
    conversationRequestFailed: (conversations, action) => {
      conversations.error = action.payload;
      conversations.loading = false;
    },
  },
});

const {
  conversationRequestFailed,
  conversationsReceived,
  conversationsRequest,
} = slice.actions;
export default slice.reducer;

export const loadConversations = () => (dispatch) => {
  actions.apiCallBegan({
    url,
    method: 'GET',
    onStart: conversationsRequest.type,
    onSuccess: conversationsReceived.type,
    onError: conversationRequestFailed.type,
  });
};
