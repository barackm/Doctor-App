import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import style from '../../config/style';

export default function SubmitBtn({ text, onPress }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity style={styles.container} onPress={handleSubmit}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginVertical: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.84,
    elevation: 6,
  },

  text: {
    ...style.text,
    color: colors.white,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
// rnfs
