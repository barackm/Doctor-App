import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as Yup from 'yup';

import colors from '../../config/colors';
import Input from '../../components/forms/Input';
import SubmitBtn from '../../components/forms/SubmitBtn';
import Screen from '../../components/Screen';
import style from '../../config/style';
import AppForm from '../../components/forms/AppForm';
import { signupUser } from '../../store/reducers/auth';
import { connect } from 'react-redux';
import Preloader from '../../components/common/Preloader';
import Notification from '../../components/common/Notification';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
  username: Yup.string().required('Username is required'),
});

function SignupScreen({
  navigation,
  signupUser,
  loading,
  isAuthenticated,
  error,
}) {
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Signup');
    }
  }, [loading]);

  const handleSubmit = (values) => {
    signupUser({
      email: values.email,
      password: values.password,
      name: values.username,
    });
  };
  if (isAuthenticated) {
    navigation.navigate('Signup');
  }
  return (
    <View style={styles.keyboard}>
      <Screen style={styles.container}>
        {error &&
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
          })}
        <SafeAreaView style={styles.loginSubContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logo3.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.welcomeMessages}>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.account}>Login to your account</Text>
          </View>
          {loading ? (
            <Preloader />
          ) : (
            <AppForm
              initialValues={{ username: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Username"
                icon={
                  <AntDesign name="user" size={30} color={colors.primary} />
                }
                secureTextEntry={false}
                name="username"
              />
              <Input
                placeholder="Email"
                icon={
                  <Fontisto name="email" size={30} color={colors.primary} />
                }
                secureTextEntry={false}
                name="email"
              />
              <Input
                placeholder="Password"
                icon={
                  <AntDesign name="lock1" size={30} color={colors.primary} />
                }
                secureTextEntry
                name="password"
              />
              <SubmitBtn text="Sign Up" />
            </AppForm>
          )}
          {!loading && (
            <View style={styles.myDoctor}>
              <View style={styles.leftLine} />
              <Text style={styles.myDoctorText}>MY DOCTOR</Text>
              <View style={styles.rightLine} />
            </View>
          )}
        </SafeAreaView>
        {!loading && (
          <View style={styles.createAccount}>
            <Text style={styles.missAccount}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signup}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    alignItems: 'center',
  },

  loginSubContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 130,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  welcomeMessages: {
    alignItems: 'center',
    marginBottom: 15,
  },
  welcome: {
    ...style.text,
    fontSize: 28,
  },

  account: {
    ...style.text,
    fontSize: 16,
  },

  createAccount: {
    marginVertical: 30,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },

  missAccount: {
    ...style.text,
    fontSize: 16,
  },

  signup: {
    ...style.text,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  myDoctor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  leftLine: {
    width: 20,
    height: 1,
    backgroundColor: colors.primary,
    flex: 1,
  },
  rightLine: {
    width: 20,
    height: 1,
    flex: 1,
    backgroundColor: colors.primary,
  },
  myDoctorText: {
    ...style.text,
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 10,
    color: colors.primary,
  },
});

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  };
};

const mapDispatchToProps = {
  signupUser: (user) => signupUser(user),
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
