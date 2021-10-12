import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import TestHistoryScreen from '../screens/tests/TestHistoryScreen';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import colors from '../config/colors';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Messages"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerRight: () =>
            route.params.currentUser.isDoctor && route.params.patient ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 15 }}
                onPress={() =>
                  navigation.navigate('Tests', {
                    patientId: route.params.patientId,
                    patient: route.params.patient,
                  })
                }
              >
                <Fontisto name="test-tube" size={24} color={colors.danger} />
              </TouchableOpacity>
            ) : (
              ''
            ),
          headerBackTitle: null,
        })}
        component={ChatRoomScreen}
      />
      <Stack.Screen
        name="Tests"
        component={TestHistoryScreen}
        options={({ route }) => ({
          title: `${route.params.patient.name}'s tests`,
        })}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
