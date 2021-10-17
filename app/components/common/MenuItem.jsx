import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../config/colors';
import style from '../../config/style';
export default function ChatListItem({ item, onPress, icon, image }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && (
        <LinearGradient
          colors={[colors.primary, colors.darkerPrimary]}
          style={styles.profileIcon}
        >
          {icon}
        </LinearGradient>
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderBottomColor: colors.lightDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },

  textWrapper: {},
  text: {
    ...style.text,
    fontSize: 18,
    fontWeight: '500',
  },
});
