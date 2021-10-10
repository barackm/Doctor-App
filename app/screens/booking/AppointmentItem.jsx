import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import colors from '../../config/colors';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteItem from '../../components/common/DeleteItem';
import style from '../../config/style';
import storage from '../../auth/storage';
import { removeAppointment } from '../../store/reducers/appointments';
import { connect } from 'react-redux';

const AppointmentItem = ({ appointment, removeAppointment }) => {
  const [isDoctor, setIsDoctor] = React.useState(false);
  const { doctor, patient, date, time, description } = appointment;
  useEffect(() => {
    storage.getAuthToken().then((token) => {
      const user = jwtDecode(token);
      setIsDoctor(user._id === appointment.doctor._id);
    });
  }, []);
  const handleDeleteAppointment = (appointment) => {
    Alert.alert(
      'Are you sure you want to delete this appointment?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            removeAppointment(appointment._id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <DeleteItem onPress={() => handleDeleteAppointment(appointment)} />
      )}
    >
      <View style={styles.container}>
        <View style={styles.appointmentDetails}>
          <View style={styles.doctorTitleWrapper}>
            <Text style={styles.doctor}>
              {isDoctor ? patient.name : doctor.name}
            </Text>
            <Text style={styles.date}>
              {moment(JSON.parse(date)).format('MMM Do YY')} at{' '}
              {time.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.appointmentTextDetails} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View style={styles.appointmentDelete}>
          <Entypo name="chevron-thin-right" color={colors.dark} size={25} />
        </View>
      </View>
    </Swipeable>
  );
};

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

const mapDispatchToProps = {
  removeAppointment: (appointmentId) => removeAppointment(appointmentId),
};
export default connect(null, mapDispatchToProps)(AppointmentItem);
