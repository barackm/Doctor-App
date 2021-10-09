import React from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

// import './app/services/socket';
import store from './app/store/configureStore';
import Main from './app/Main';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}
