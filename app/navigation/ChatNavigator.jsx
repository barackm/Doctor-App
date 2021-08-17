import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatListScreen from '../screens/ChatListScreen';
// import TabBarContext from '../components/context/TabBarContext';
const Stack = createStackNavigator();

const ChatNavigator = () => {
  // const tabBarContext = useContext(TabBarContext);
  // tabBarContext.onChangeTab();

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
