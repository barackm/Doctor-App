import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import storage from './auth/storage';

const Main = ({ isUserAuthenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  useEffect(() => {
    getToken();
  });
  const getToken = async () => {
    try {
      const token = await storage.getAuthToken();
      console.log(setIsAuthenticated);
      setIsAuthenticated(token || isUserAuthenticated ? true : false);
    } catch (error) {
      return null;
    }
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// const hideTabBar = () => {
// const route = useRoute();
// if (route.state && route.state.index > 0) {
//   navigation.setOptions({ tabBarVisible: false });
// } else {
//   navigation.setOptions({ tabBarVisible: true });
// }
// };
