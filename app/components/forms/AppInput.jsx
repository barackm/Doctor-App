import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import colors from '../../config/colors';
import style from '../../config/style';

export default function AppInput({
  placeholder,
  style = {},
  multiline = false,
  label,
  name,
  autoCapitalize = 'none',
}) {
  const { handleChange, values } = useFormikContext();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { ...style }]}
          placeholder={placeholder}
          multiline={multiline}
          value={values[name]}
          autoCapitalize={autoCapitalize}
          onChangeText={handleChange(name)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    borderRadius: 5,
    ...style.boxShaddow,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    ...style.text,
  },
  label: {
    ...style.text,
    fontWeight: 'bold',
    color: colors.medium,
    marginBottom: 10,
  },
});
