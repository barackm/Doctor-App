import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../config/colors';

const Preloader = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={(animation) => {
          animation && animation.play();
        }}
        style={{
          width: 150,
          height: 150,
          backgroundColor: colors.light,
        }}
        source={require('../../../assets/preloader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Preloader;
