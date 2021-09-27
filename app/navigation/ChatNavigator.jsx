import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Messages"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
