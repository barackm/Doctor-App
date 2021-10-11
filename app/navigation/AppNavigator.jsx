import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../config/colors';
import ChatNavigator from './ChatNavigator';
import DoctorNavigator from './DoctorsNavigator';
import ProfileNavigator from './ProfileNavigator';

window.hiddenTabBar = true;

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.white,
        showLabel: false,
      }}
      screenOptions={{
        tabBarVisible: window.hiddenTabBar,
      }}
    >
      <Tab.Screen
        name="Messages"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItemContainer,
                {
                  backgroundColor: focused ? colors.primary : colors.white,
                  paddingHorizontal: focused ? 20 : 0,
                  paddingVertical: focused ? 5 : 0,
                  borderRadius: focused ? 20 : 0,
                },
              ]}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={24}
                color={focused ? colors.white : colors.primary}
              />
              {focused && <Text style={styles.tabItemText}>Chats</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={DoctorNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItemContainer,
                {
                  backgroundColor: focused ? colors.primary : colors.white,
                  paddingHorizontal: focused ? 20 : 0,
                  paddingVertical: focused ? 5 : 0,
                  borderRadius: focused ? 20 : 0,
                },
              ]}
            >
              <FontAwesome
                name="stethoscope"
                size={24}
                color={focused ? colors.white : colors.primary}
              />
              {focused && <Text style={styles.tabItemText}>Doctors</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItemContainer,
                {
                  backgroundColor: focused ? colors.primary : colors.white,
                  paddingHorizontal: focused ? 10 : 0,
                  paddingVertical: focused ? 5 : 0,
                  borderRadius: focused ? 20 : 0,
                },
              ]}
            >
              <Entypo
                name="user"
                size={24}
                color={focused ? colors.white : colors.primary}
              />
              {focused && <Text style={styles.tabItemText}>Profile</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: colors.white,
  },
});
export default AppNavigator;
