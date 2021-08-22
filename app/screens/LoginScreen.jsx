import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';
import Input from '../components/forms/Input';
import SubmitBtn from '../components/forms/SubmitBtn';
import Screen from '../components/Screen';
import style from '../config/style';

export default function LoginScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.safeView} behavior='padding'>
      <Screen style={styles.container}>
        <SafeAreaView style={styles.loginSubContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo3.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.welcomeMessages}>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.account}>Login to your account</Text>
          </View>
          <Input
            placeholder='Username'
            icon={<AntDesign name='user' size={30} color={colors.primary} />}
            secureTextEntry={false}
          />
          <Input
            placeholder='Password'
            icon={<AntDesign name='lock1' size={24} color={colors.primary} />}
            secureTextEntry={true}
          />
          <SubmitBtn text='Login' />

          <View style={styles.myDoctor}>
            <View style={styles.leftLine} />
            <Text style={styles.myDoctorText}>MY DOCTOR</Text>
            <View style={styles.rightLine} />
          </View>
        </SafeAreaView>
        <View style={styles.createAccount}>
          <Text style={styles.missAccount}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    // width: '100%',
  },
  container: {
    // flex: 1,
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
