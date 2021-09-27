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

import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import colors from '../../config/colors';
import Input from '../../components/forms/Input';
import SubmitBtn from '../../components/forms/SubmitBtn';
import Screen from '../../components/Screen';
import style from '../../config/style';
import AppForm from '../../components/forms/AppForm';
import Preloader from '../../components/common/Preloader';
import { loginUser } from '../../store/reducers/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation, loginUser, loading }) => {
  const handleSubmit = (values) => {
    loginUser({ email: values.email, password: values.password });
  };
  return (
    <KeyboardAvoidingView style={styles.safeView}>
      <Screen style={styles.container}>
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
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Username or Email"
                icon={
                  <AntDesign name="user" size={30} color={colors.primary} />
                }
                secureTextEntry={false}
                name="email"
              />
              <Input
                placeholder="Password"
                icon={
                  <AntDesign name="lock1" size={24} color={colors.primary} />
                }
                secureTextEntry={true}
                name="password"
              />
              <SubmitBtn text="Login" />
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
            <Text style={styles.missAccount}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
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
    marginTop: 70,
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
    marginTop: 35,
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

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  loginUser: (user) => loginUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
