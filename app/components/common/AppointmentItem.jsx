import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import style from '../../config/style';
import colors from '../../config/colors';

export default function AppointmentItem() {
  return (
    <TouchableOpacity>
      <Text>hello there</Text>
    </TouchableOpacity>
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
