import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/api';
import { addMessageToStore } from '../reducerFunctions/conversationFunctions';

const url = 'conversations';
const defaultConversations = [
  {
    _id: 1,
    participents: [
      {
        __v: 0,
        _id: '60f59f198f0ad40015cf3137',
        createdAt: 'July 19, 2021',
        doctorName: 'EstherRush',
        email: 'Esther@gmail.com',
        isAdmin: false,
        isSuperAdmin: false,
        lastName: 'esther',
        name: 'Esther',
        password:
          '$2b$10$t.93ipzGdhL1URJYlcW3L./fSfpXxt.2lhdzoeSYN1sBrPnzfOlfm',
        phoneNumber: '0782301208',
        profileImage:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        role: 'doctor',
      },
      {
        __v: 0,
        _id: '60f595980e8f8b0015711561',
        createdAt: 'July 19, 2021',
        doctorName: 'moise30wr',
        email: 'moise30rr@gmail.com',
        isAdmin: false,
        isSuperAdmin: false,
        lastName: 'rushw',
        name: 'moisers',
        password:
          '$2b$10$KQ0ce/L5PP46VYshm5D1y.jeaLfOxa9dWZHidFZ40LkMDqbVvk/BO',
        phoneNumber: '0782301208',
        profileImage:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        role: 'doctor',
      },
    ],
    messages: [
      {
        _id: 1,
        senderId: '6122cdfb8a4e5200164519dc',
        text: 'Hello dear Doctor, I hope you are doing great',
        createdAt: '14:13',
        roomId: 1,
        seen: true,
      },
      {
        _id: 2,
        senderId: '60f595980e8f8b0015711561',
        text: 'Yes I am doing great, I guess you too?',
        createdAt: '14:13',
        roomId: 1,
        seen: true,
      },
      {
        _id: 3,
        senderId: '6122cdfb8a4e5200164519dc',
        text: 'Not really😔',
        createdAt: '14:13',
        roomId: 1,
        seen: true,
      },
      {
        _id: 4,
        senderId: '6122cdfb8a4e5200164519dc',
        text: 'I have a problem with my neck🤒',
        createdAt: '14:13',
        roomId: 1,
        seen: true,
      },
      {
        _id: 5,
        senderId: '60f595980e8f8b0015711561',
        text: 'Oh I am so sorry, since when do you have that problem?',
        createdAt: '14:13',
        roomId: 1,
        seen: false,
      },
      {
        _id: 6,
        senderId: '6122cdfb8a4e5200164519dc',
        text: 'Since this moring Doctor',
        createdAt: '14:13',
        roomId: 1,
        seen: false,
      },
    ],
    latestMessageText:
      'Hello, how are you feeling today? did you manage to go to school',
    latestMessageCreatedAt: 'July 19, 2021',
  },
];

const slice = createSlice({
  name: 'conversations',
  initialState: {
    list: defaultConversations,
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

export const {
  conversationRequestFailed,
  conversationsReceived,
  conversationsRequest,
  newMessageAdded,
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

export const unreadMessagesCount = (conversations) => {};
