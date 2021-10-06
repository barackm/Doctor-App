import io from 'socket.io-client';
import store from '../store/configureStore';
import { newMessageAdded } from '../store/reducers/conversations';

const apiEndpoint = 'http://localhost:3001';

const socket = io(apiEndpoint);

socket.on('connect', () => {
  console.log('connected to server');
  socket.on('new-message', (data) => {
    store.dispatch({ type: newMessageAdded.type, payload: data });
  });
});

export default socket;
