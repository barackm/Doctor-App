import io from 'socket.io-client';
import store from './configureStore';

const apiEndpoint = 'http://localhost:3001';

const socket = io(apiEndpoint);

socket.on('connect', () => {
  console.log('connected to server');
  socket.on('new-message', (data) => {
    store.dispatch(
      conversationActions.setNewMessage(data.message, data.sender),
    );
  });
});

export default socket;
