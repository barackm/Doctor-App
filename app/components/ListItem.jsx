import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import style from '../config/style';
import capitalize from '../utils/capitalize';

export default function ListItem({ onPress, doctor }) {
  const { name, lastName } = doctor;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {capitalize(name)} {capitalize(lastName)}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          MBBS, FCP, MACP
        </Text>
        <Text style={styles.info} numberOfLines={1}>
          Medecine Specialist
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,

    ...style.boxShaddow,
  },
  title: {
    ...style.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    color: colors.medium,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  info: {
    color: colors.medium,
  },
  imageContainer: {
    marginRight: 15,
  },
});
