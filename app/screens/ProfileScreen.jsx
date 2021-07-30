import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import style from '../config/style';
import colors from '../config/colors';
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Octicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MenuItem from '../components/common/MenuItem';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Tynan-Allan.jpeg',
            }}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Jeremy Alexander</Text>
        </View>
        <View style={styles.profileIconsWrapper}>
          <TouchableOpacity>
            <LinearGradient
              colors={[colors.primary, colors.darkerPrimary]}
              style={styles.profileIcon}
            >
              <MaterialCommunityIcons
                name='email-outline'
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
              <Feather name='phone-call' size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
            <LinearGradient
              colors={[colors.primary, colors.darkerPrimary]}
              style={styles.profileIcon}
            >
              <MaterialCommunityIcons
                name='pencil-outline'
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
          icon={<FontAwesome name='calendar' size={20} color={colors.white} />}
          onPress={() => navigation.navigate('Appointments')}
        />
        <MenuItem
          item={{ name: 'Tests history' }}
          icon={<Fontisto name='test-tube' size={20} color={colors.white} />}
          onPress={() => navigation.navigate('Tests History')}
        />
        <MenuItem
          item={{ name: 'Payments' }}
          icon={<FontAwesome name='money' size={20} color={colors.white} />}
          onPress={() => navigation.navigate('Payments History')}
        />
        <MenuItem
          item={{ name: 'Settings' }}
          icon={<Octicons name='settings' size={20} color={colors.white} />}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ScrollView>
  );
}

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
