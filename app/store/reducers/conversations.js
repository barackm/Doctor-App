import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import socket from '../../services/socket';
import * as actions from '../actions/api';

const url = 'conversations';
const messagesURL = 'messages';

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
      const { conversationId, newConversation } = action.payload;
      if (conversationId === 'new') {
        conversations.list.push(newConversation);
      } else {
        const newCon = [...conversations.list];
        const index = newCon.findIndex(
          (conversation) => conversation._id === conversationId,
        );
        newCon[index] = newConversation;
        conversations.list = newCon.sort((a, b) => {
          if (a.lastMessage.createdAt > b.lastMessage.createdAt) {
            return -1;
          }
          if (a.lastMessage.createdAt < b.lastMessage.createdAt) {
            return 1;
          }
          return 0;
        });
      }

      socket.emit('new-message', newConversation);
      conversations.loading = false;
      conversations.error = null;
    },
    conversationAdded: (conversations, action) => {
      const { conversation, currentUser } = action.payload;
      const convList = [...conversations.list];
      const index = convList.findIndex((conv) => conv._id === conversation._id);
      if (index !== -1) {
        convList[index] = conversation;
      } else {
        const index = convList.findIndex((conv) =>
          conv.participants.find(
            (participant) => participant._id === currentUser._id,
          ),
        );
        if (index !== -1) {
          convList[index] = conversation;
        }
      }
      conversations.list = convList.sort((a, b) => {
        if (a.lastMessage.createdAt > b.lastMessage.createdAt) {
          return -1;
        }
        if (a.lastMessage.createdAt < b.lastMessage.createdAt) {
          return 1;
        }
        return 0;
      });
      conversations.loading = false;
      conversations.error = null;
    },

    conversationUpdated: (conversations, action) => {
      const { conversationId, updatedConversation } = action.payload;
      const newCon = [...conversations.list];
      const index = newCon.findIndex(
        (conversation) => conversation._id === conversationId,
      );
      newCon[index] = updatedConversation;
      conversations.list = newCon.sort((a, b) => {
        if (a.lastMessage.createdAt > b.lastMessage.createdAt) {
          return -1;
        }
        if (a.lastMessage.createdAt < b.lastMessage.createdAt) {
          return 1;
        }
        return 0;
      });
    },
    conversationRequestFailed: (conversations, action) => {
      conversations.error = action.payload;
      conversations.loading = false;
    },
  },
});

export const {
  conversationRequestFailed,
  conversationsReceived,
  conversationsRequest,
  newMessageAdded,
} = slice.actions;
export default slice.reducer;

export const loadConversations = () => async (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url,
      method: 'GET',
      onStart: conversationsRequest.type,
      onSuccess: conversationsReceived.type,
      onError: conversationRequestFailed.type,
    }),
  );
};

export const sendMessage =
  (text, conversationId, recipientId) => (dispatch) => {
    dispatch(
      actions.apiCallBegan({
        url: messagesURL,
        method: 'POST',
        data: {
          text,
          conversationId,
          recipientId,
        },
        onStart: conversationsRequest.type,
        onSuccess: newMessageAdded.type,
        onError: conversationRequestFailed.type,
      }),
    );
  };
