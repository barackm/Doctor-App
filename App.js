// import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "./app/config/colors";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import BookingCalenderScreen from "./app/screens/BookingCalenderScreen";
import DoctorProfileScreen from "./app/screens/DoctorProfileScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
