import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../../config/colors";
import style from "../../config/style";
export default function Input({ placeholder, icon, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 15,
    height: 50,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    position: "relative",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: "absolute",
    left: 0,
    width: 70,
    height: 70,
    borderRadius: 45,
    shadowColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },

  input: {
    marginLeft: 75,
    ...style.text,
  },
});
