import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import style from '../../config/style';
import AppointmentsList from './AppointmentsList';
import colors from '../../config/colors';

export default function ApointmentsScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <AppointmentsList />
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
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  search: {
    ...style.text,
    fontWeight: '900',
    fontSize: 40,
    color: colors.dark,
  },
});
