import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/user/ProfileScreen';
import AppointmentsScreen from '../screens/booking/AppointmentsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import TestHistoryScreen from '../screens/tests/TestHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import Aboutscreen from '../screens/user/AboutScreen';

const Stack = createStackNavigator();

const ProfileNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="Payments History" component={PaymentHistoryScreen} />
      <Stack.Screen name="Tests History" component={TestHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About" component={Aboutscreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
