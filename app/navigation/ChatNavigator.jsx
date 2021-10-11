import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import { Image } from 'react-native';

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
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <Image
              source={{ uri: route.params.imageUrl }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ),
          headerBackTitle: null,
        })}
        component={ChatRoomScreen}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
