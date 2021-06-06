import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ChatListScreen from "../screens/ChatListScreen";
const Stack = createStackNavigator();

const ChatNavigator = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator>
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
