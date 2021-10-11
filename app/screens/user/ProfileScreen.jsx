import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import style from '../../config/style';
import colors from '../../config/colors';
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Octicons,
  AntDesign,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import capitalize from '../../utils/capitalize';
import MenuItem from '../../components/common/MenuItem';
import { loginUserSuccess } from '../../store/actions/actionCreators';
import storage from '../../auth/storage';
import Preloader from '../../components/common/Preloader';
import { logoutUser } from '../../store/reducers/auth';
import renderProfilePicture from '../../utils/renderProfileImageUrl';

const ProfileScreen = ({ navigation, loginUser, logoutUser, currentUser }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    try {
      const token = await storage.getAuthToken();
      if (token) {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        loginUser(decoded);
      }
    } catch (error) {
      return null;
    }
  };
  const { name, lastName } = currentUser || {};
  const logout = () => {
    logoutUser();
  };

  return (
    <ScrollView style={styles.mainView}>
      {!currentUser ? (
        <View>
          <Preloader />
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: renderProfilePicture(
                    currentUser.profileImage,
                    currentUser,
                  ),
                }}
              />
            </View>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>
                {capitalize(name)} {capitalize(lastName)}
              </Text>
            </View>
            <View style={styles.profileIconsWrapper}>
              <TouchableOpacity>
                <LinearGradient
                  colors={[colors.primary, colors.darkerPrimary]}
                  style={styles.profileIcon}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color={colors.white}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={[colors.primary, colors.darkerPrimary]}
                  style={styles.profileIcon}
                >
                  <Feather name="phone-call" size={20} color={colors.white} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Edit Profile')}
              >
                <LinearGradient
                  colors={[colors.primary, colors.darkerPrimary]}
                  style={styles.profileIcon}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={25}
                    color={colors.white}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <MenuItem
              item={{ name: 'My Appointments' }}
              icon={
                <FontAwesome name="calendar" size={20} color={colors.white} />
              }
              onPress={() => navigation.navigate('Appointments')}
            />
            <MenuItem
              item={{ name: 'Tests history' }}
              icon={
                <Fontisto name="test-tube" size={20} color={colors.white} />
              }
              onPress={() => navigation.navigate('Tests History')}
            />
            <MenuItem
              item={{ name: 'Payments' }}
              icon={<FontAwesome name="money" size={20} color={colors.white} />}
              onPress={() => navigation.navigate('Payments History')}
            />
            <MenuItem
              item={{ name: 'Settings' }}
              icon={<Octicons name="settings" size={20} color={colors.white} />}
              onPress={() => navigation.navigate('Settings')}
            />
            <MenuItem
              item={{ name: 'Logout' }}
              icon={<AntDesign name="logout" size={20} color={colors.white} />}
              onPress={logout}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 50,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 10,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 40,
  },
  nameWrapper: {
    marginVertical: 10,
  },
  name: {
    ...style.text,
    fontSize: 23,
    fontWeight: 'bold',
  },
  profileIconsWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {
  logoutUser: () => logoutUser(),
  loginUser: (user) => loginUserSuccess(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
