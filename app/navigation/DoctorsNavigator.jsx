import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorsListScreen from '../screens/doctors/DoctorsListScreen';
import DoctorProfileScreen from '../screens/doctors/DoctorProfileScreen';
import BookingCalenderScreen from '../screens/booking/BookingCalenderScreen';

const Stack = createStackNavigator();

const DoctorsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Doctors"
        component={DoctorsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctor"
        component={DoctorProfileScreen}
        options={{ headerShown: true, mode: 'modal' }}
      />
      <Stack.Screen name="Booking" component={BookingCalenderScreen} />
    </Stack.Navigator>
  );
};

export default DoctorsNavigator;
