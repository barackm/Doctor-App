import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';
import storage from '../auth/storage';
import store from '../store/configureStore';
import * as actions from '../store/actions/actionCreators';

const apiEndpoint = 'http://192.168.1.69:5000';

const socket = io(apiEndpoint);
socket.on('connect', () => {
  console.log('connected to server...');
});

socket.on('new-message', async (conversation) => {
  console.log(conversation);
  const conversations = store.getState().conversations.list;
  const courrentUser = jwtDecode(await storage.getAuthToken());
  const conversationIndex = conversations.findIndex(
    (c) => c._id === conversation._id,
  );

  if (conversationIndex === -1) {
    const isCurrentUser = conversation.participants.find(
      (p) => p._id === courrentUser._id,
    );
    if (isCurrentUser) {
      store.dispatch(actions.conversationAdded(conversation));
    }
  } else {
    store.dispatch(actions.conversationUpdated(conversation));
  }
});

export default socket;
