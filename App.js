import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore';
import Main from './app/Main';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
