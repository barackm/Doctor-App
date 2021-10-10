import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export default function DeleteItem({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appointmentDelete}>
      <EvilIcons name="trash" color={colors.white} size={40} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightDark,
    height: 1,
  },
  appointmentDelete: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
  },
});
