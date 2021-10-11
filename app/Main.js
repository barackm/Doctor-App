import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import storage from './auth/storage';
import { loginUserSuccess } from './store/actions/actionCreators';

const Main = ({ isUserAuthenticated, loginUser, socket }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    getToken();
  });
  const getToken = async () => {
    try {
      const token = await storage.getAuthToken();
      setIsAuthenticated(token || isUserAuthenticated ? true : false);
      if (token) {
        const decoded = jwtDecode(token);
        loginUser(decoded);
      }
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
const mapDispatchToProps = {
  loginUser: (user) => loginUserSuccess(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
