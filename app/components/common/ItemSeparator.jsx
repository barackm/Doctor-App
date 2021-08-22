import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default function ItemSeparator() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightDark,
    height: 1,
  },
});
