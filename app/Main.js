import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import Preloader from './components/common/Preloader';
import storage from './auth/storage';
import { loginUserSuccess } from './store/actions/actionCreators';

const Main = ({ loginUser }) => {
  let isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getToken();
  }, [isUserAuthenticated]);
  const getToken = async () => {
    try {
      const token = await storage.getAuthToken();
      if (token) {
        const decoded = jwtDecode(token);
        loginUser(decoded);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  return (
    <NavigationContainer>
      {loading ? (
        <Preloader />
      ) : (
        <>{isUserAuthenticated ? <AppNavigator /> : <AuthNavigator />}</>
      )}
    </NavigationContainer>
  );
};

const mapDispatchToProps = {
  loginUser: (user) => loginUserSuccess(user),
};

export default connect(null, mapDispatchToProps)(Main);
