import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from '../config/colors';
import style from '../config/style';

const SubmitBtn = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.submitBtnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontWeight: 'bold',
    ...style.text,
    color: colors.white,
  },
});

export default SubmitBtn;
