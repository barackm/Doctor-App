import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from './Screen';
import style from '../config/style';
import colors from '../config/colors';
import AppointmentItem from './common/AppointmentItem';

export default function AppointmentsList() {
  return (
    <Screen style={styles.container}>
      <AppointmentItem />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
  },
});
