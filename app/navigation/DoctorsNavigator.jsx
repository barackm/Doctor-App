import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorsListScreen from '../screens/DoctorsListScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import BookingCalenderScreen from '../screens/BookingCalenderScreen';

const Stack = createStackNavigator();

const DoctorsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Doctors'
        component={DoctorsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Doctor'
        component={DoctorProfileScreen}
        options={{ headerShown: true, mode: 'modal' }}
      />
      <Stack.Screen name='Booking' component={BookingCalenderScreen} />
    </Stack.Navigator>
  );
};

export default DoctorsNavigator;
