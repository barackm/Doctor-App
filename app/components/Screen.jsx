import React from 'react';
import Constants from 'expo-constants';

import { StyleSheet, SafeAreaView, View } from 'react-native';
import colors from '../config/colors';

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
  },
});
