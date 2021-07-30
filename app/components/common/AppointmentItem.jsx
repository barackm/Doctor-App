import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import style from '../../config/style';
import colors from '../../config/colors';
import { Entypo } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteItem from './DeleteItem';

export default function AppointmentItem() {
  return (
    <Swipeable renderRightActions={() => <DeleteItem />}>
      <View style={styles.container}>
        <View style={styles.appointmentDetails}>
          <View style={styles.doctorTitleWrapper}>
            <Text style={styles.doctor}>John Doe</Text>
            <Text style={styles.date}>Tomorrow 12:30</Text>
          </View>
          <Text style={styles.appointmentTextDetails} numberOfLines={2}>
            When you are believing God for a miracle, you need to focus on faith
            not feelings. You need to focus on the biblical report and not your
            medical
          </Text>
        </View>
        <View style={styles.appointmentDelete}>
          <Entypo name='chevron-thin-right' color={colors.dark} size={25} />
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  doctorTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctor: {
    ...style.text,
    fontWeight: '900',
    fontSize: 18,
  },
  date: {
    ...style.text,
    fontSize: 16,
    color: colors.dark,
    fontWeight: '800',
  },

  appointmentTextDetails: {
    fontSize: 16,
    color: colors.medium,
    paddingVertical: 5,
  },
  appointmentDetails: {
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
});
