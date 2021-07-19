import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import TestHistoryScreen from '../screens/TestHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const ProfileNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Appointments' component={AppointmentsScreen} />
      <Stack.Screen name='Payments History' component={PaymentHistoryScreen} />
      <Stack.Screen name='Tests History' component={TestHistoryScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
