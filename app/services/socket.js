import io from 'socket.io-client';
// import store from '../store/configureStore';
// import { newMessageAdded } from '../store/reducers/conversations';
const apiEndpoint = 'http://192.168.1.69:5000';

const socket = io(apiEndpoint);

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('new-message', (data) => {
    console.log('new-message', data);
  });
});

export default socket;
