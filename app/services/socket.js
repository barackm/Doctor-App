import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';

import storage from '../auth/storage';
import * as actions from '../store/actions/actionCreators';
import store from '../store/configureStore';

const apiEndpoint = 'http://192.168.1.69:5000';

const socket = io(apiEndpoint);

socket.on('connect', () => {});

socket.on('new-message', (conversation) => {
  storage.getAuthToken().then((token) => {
    const currentUser = jwtDecode(token);

    store.dispatch(actions.conversationAdded({ conversation, currentUser }));
  });
});

socket.on('new-test', (test) => {
  storage.getAuthToken().then((token) => {
    const user = jwtDecode(token);
    if (test.patient._id === user._id) {
      console.log('new test');
      store.dispatch(actions.testAdded(test));
    }
  });
});

export default socket;
