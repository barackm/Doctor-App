import React from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import colors from '../../config/colors';
import style from '../../config/style';
export default function Input({ placeholder, icon, secureTextEntry, name }) {
  const { handleChange, values, errors, touched } = useFormikContext();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{icon}</View>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={values[name]}
          onChangeText={handleChange(name)}
        />
      </View>
      {touched[name] && <Text style={styles.inputError}>{errors[name]}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15,
    height: 50,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    width: 70,
    height: 70,
    borderRadius: 45,
    shadowColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },

  input: {
    marginLeft: 75,
    ...style.text,
  },
  inputError: {
    color: colors.danger,
  },
});
