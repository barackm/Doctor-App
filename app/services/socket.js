import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';

import storage from '../auth/storage';
import * as actions from '../store/actions/actionCreators';
import store from '../store/configureStore';

const apiEndpoint = 'https://aqueous-gorge-50977.herokuapp.com/';

const socket = io(apiEndpoint);

socket.on('connect', () => {
  console.log('connected...');
});

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
