import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export default function DeleteItem() {
  return (
    <TouchableOpacity style={styles.appointmentDelete}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        color={colors.white}
        size={30}
      />
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
