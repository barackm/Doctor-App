import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import AppNavigator from './app/navigation/AppNavigator';
import configureStore from './app/store/configureStore';

const store = configureStore();

export default function App() {
  // const hideTabBar = () => {
  // const route = useRoute();
  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false });
  // } else {
  //   navigation.setOptions({ tabBarVisible: true });
  // }
  // };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        {/* <AuthNavigator /> */}
      </NavigationContainer>
    </Provider>
  );
}
