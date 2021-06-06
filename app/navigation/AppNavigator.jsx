import React from "react";
import DoctorsListScreen from "../screens/DoctorsListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import ChatNavigator from "./ChatNavigator";
import DoctorNavigator from "./DoctorsNavigator";

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: colors.white,
      borderRadius: 30,
      showLabel: false,
    }}
  >
    <Tab.Screen
      name="Messages"
      component={ChatNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View
            style={[
              styles.tabItemContainer,
              {
                backgroundColor: focused ? colors.primary : color.white,
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
        tabBarIcon: ({ size, color, focused }) => (
          <View
            style={[
              styles.tabItemContainer,
              {
                backgroundColor: focused ? colors.primary : color.white,
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
      component={DoctorsListScreen}
      options={{
        tabBarIcon: ({ size, color, focused }) => (
          <View
            style={[
              styles.tabItemContainer,
              {
                backgroundColor: focused ? colors.primary : color.white,
                paddingHorizontal: focused ? 10 : 0,
                paddingVertical: focused ? 5 : 0,
                borderRadius: focused ? 20 : 0,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={24}
              color={focused ? colors.white : colors.primary}
            />
            {focused && <Text style={styles.tabItemText}>Menu</Text>}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: colors.white,
  },
});
export default AppNavigator;
