import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendario';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import style from '../../config/style';
import AppInput from '../../components/forms/AppInput';
import capitalize from '../../utils/capitalize';
import Preloader from '../../components/common/Preloader';
import AppForm from '../../components/forms/AppForm';
import SubmitBtn from '../../navigation/SubmitBtn';
import {
  createAppointment,
  getDoctorAppointments,
  loadAppointments,
  removeAppointment,
} from '../../store/reducers/appointments';
import renderProfilePicture from '../../utils/renderProfileImageUrl';

const validationSchema = Yup.object().shape({
  appointmentDescription: Yup.string().min(10).required(),
});

const BookingCalenderScreen = ({
  route,
  navigation,
  doctors,
  loading,
  loadAppointments,
  createAppointment,
  getDoctorAppointments,
  doctorAppointments,
}) => {
  const { params } = route;
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [slots, setSlots] = useState([
    { id: 1, time: '09:00 am', taken: false, active: false },
    { id: 2, time: '10:00 am', taken: false, active: false },
    { id: 3, time: '11:00 am', taken: false, active: false },
    { id: 4, time: '12:00 am', taken: false, active: false },
    { id: 5, time: '02:00 pm', taken: false, active: false },
    { id: 6, time: '03:00 pm', taken: false, active: false },
    { id: 7, time: '04:20 pm', taken: false, active: false },
    { id: 8, time: '07:40 pm', taken: false, active: false },
  ]);

  useEffect(() => {
    if (!params) navigation.navigate('Doctors');
    const d = doctors.find((d) => d._id === params);
    if (!d) navigation.navigate('Doctors');
    setDoctor(d);
    loadAppointments();
    getDoctorAppointments(params);
  }, []);

  const renderBackgroundColor = (item, colors) => {
    let color = '';
    if (item.active && !item.taken) {
      color = colors.primary;
    } else if (item.taken && !item.active) {
      color = colors.danger;
    } else {
      color = colors.white;
    }
    return color;
  };

  const renderColor = (item, colors) => {
    let color = '';
    if (item.active && !item.taken) {
      color = colors.white;
    } else if (item.taken && !item.active) {
      color = colors.white;
    } else {
      color = colors.medium;
    }

    return color;
  };

  const handleSelectDates = (date) => {
    setSelectedDate(date);
    getDoctorAppointments(params);
    setSlots(
      slots.map((slot) => {
        slot.taken = false;
        return slot;
      }),
    );

    doctorAppointments.forEach((appointment) => {
      if (appointment.date === JSON.stringify(date.startDate)) {
        const index = slots.findIndex((s) => s.time === appointment.time);
        const newSlots = [...slots];
        newSlots[index].taken = true;
        setSlots(newSlots);
      } else {
        // setSlots(slots.map((slot) => (slot.taken = false)));
      }
    });
  };

  const handleSelectSlot = (slot) => {
    if (slot.taken) return Alert.alert('This time is already taken');
    if (!selectedDate) return Alert.alert('Please select first a date');
    if (selectedSlot && selectedSlot.id !== slot.id) return;
    setSlots(
      slots.map((s) => {
        if (s.id === slot.id) {
          if (slot.active) {
            s.active = false;
            setSelectedSlot(null);
          } else {
            s.active = true;
            setSelectedSlot(s);
          }
        }
        return s;
      }),
    );
  };

  const getMorningSlots = (slots) => {
    return slots.filter((slot) => slot.time.includes('am'));
  };

  const getAfternoonSlots = (slots) => {
    return slots.filter((slot) => slot.time.includes('pm'));
  };
  const handleSubmitAppointment = ({ appointmentDescription }) => {
    if (!selectedDate) return Alert.alert('Please select first a date');
    if (!selectedSlot) return Alert.alert('Please select first a slot');
    if (selectedDate && selectedSlot) {
      const appointment = {
        description: appointmentDescription,
        time: selectedSlot.time,
        date: JSON.stringify(selectedDate.startDate),
        doctorId: doctor._id,
      };

      createAppointment(appointment);
      setSelectedSlot(null);
      setSelectedDate(null);

      setSlots(
        slots.map((slot) => {
          slot.active = false;
          slot.taken = false;
          return slot;
        }),
      );

      navigation.goBack();
    }
  };

  const { name, lastName } = doctor || {};
  const { startDate } = selectedDate || {};
  return (
    <KeyboardAvoidingView
      style={styles.safeView}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      {loading || !name ? (
        <Preloader />
      ) : (
        <FlatList
          data={[]}
          ListEmptyComponent={null}
          keyExtractor={() => 'dummy'}
          renderItem={null}
          style={styles.mainView}
          ListHeaderComponent={() => (
            <React.Fragment>
              <Screen style={styles.container}>
                <AppForm
                  validationSchema={validationSchema}
                  initialValues={{ appointmentDescription: '' }}
                  onSubmit={handleSubmitAppointment}
                >
                  <View style={styles.header}>
                    <View style={styles.doctorImage}>
                      <Image
                        source={{
                          uri: renderProfilePicture(
                            doctor.profilePicture,
                            doctor,
                          ),
                        }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.topDoctorDetails}>
                      <Text style={styles.topDoctorName} numberOfLines={1}>
                        {capitalize(name)} {capitalize(lastName)}
                      </Text>
                      <Text style={styles.topDoctorSubTitle} numberOfLines={1}>
                        MBBS, FCP, MACP
                      </Text>
                      <View style={styles.topDoctorRating}>
                        <View style={styles.stars}>
                          {[1, 2, 3, 4, 5].map((item) => (
                            <FontAwesome
                              key={item}
                              name="star"
                              size={15}
                              color={colors.gold}
                            />
                          ))}
                        </View>
                        <Text style={styles.doctorRating}>(227)</Text>
                      </View>
                      <Text style={styles.headerSubTitle}>
                        Book an Appointment
                      </Text>
                    </View>
                  </View>
                  <View style={styles.calendarContainer}>
                    <Calendar
                      scrollEnabled={false}
                      onChange={(range) => handleSelectDates(range)}
                      startDate={startDate || new Date(2018, 3, 30)}
                      numberOfMonths={1}
                      monthFormat={'MMM d, yyyy'}
                      theme={{
                        activeDayColor: {},
                        monthTitleTextStyle: {
                          color: '#6d95da',
                          fontWeight: '300',
                          fontSize: 16,
                        },
                        emptyMonthContainerStyle: {},
                        emptyMonthTextStyle: {
                          fontWeight: '200',
                        },
                        weekColumnsContainerStyle: {},
                        weekColumnStyle: {
                          paddingVertical: 5,
                        },
                        weekColumnTextStyle: {
                          color: '#b6c1cd',
                          fontSize: 14,
                          fontWeight: 'bold',
                        },
                        nonTouchableDayContainerStyle: {},
                        nonTouchableDayTextStyle: {},
                        startDateContainerStyle: {},
                        endDateContainerStyle: {},
                        dayContainerStyle: {},
                        dayTextStyle: {
                          color: '#2d4150',
                          fontWeight: '500',
                          fontSize: 15,
                        },
                        dayOutOfRangeContainerStyle: {},
                        dayOutOfRangeTextStyle: {},
                        todayContainerStyle: {},
                        todayTextStyle: {
                          color: colors.primary,
                          fontWeight: 'bold',
                          fontSize: 16,
                        },
                        activeDayContainerStyle: {
                          backgroundColor: colors.primary,
                        },
                        activeDayTextStyle: {
                          color: 'white',
                        },
                        nonTouchableLastMonthDayTextStyle: {},
                      }}
                      disableRange={true}
                      orientation="horizontal"
                    />
                  </View>

                  <View style={styles.timeContainer}>
                    <View style={styles.timeItem}>
                      <Text style={styles.title}>Morning Slots</Text>

                      <View style={styles.availableTime}>
                        {getMorningSlots(slots).map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => handleSelectSlot(item)}
                            style={[
                              styles.availableTimeItem,
                              {
                                backgroundColor: renderBackgroundColor(
                                  item,
                                  colors,
                                ),
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.timeText,
                                { color: renderColor(item, colors) },
                              ]}
                            >
                              {item.time}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.timeItem}>
                      <Text style={styles.title}>Afternoon Slots</Text>

                      <View style={styles.availableTime}>
                        {getAfternoonSlots(slots).map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => handleSelectSlot(item)}
                            style={[
                              styles.availableTimeItem,
                              {
                                backgroundColor: renderBackgroundColor(
                                  item,
                                  colors,
                                ),
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.timeText,
                                { color: renderColor(item, colors) },
                              ]}
                            >
                              {item.time}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={styles.bookingInfoContainer}>
                    <AppInput
                      placeholder="Description"
                      style={{ height: 100 }}
                      multiline={true}
                      label="Description"
                      name="appointmentDescription"
                    />
                  </View>

                  <View style={styles.confirmation}>
                    <SubmitBtn title="Confirm Appointment" />
                  </View>
                </AppForm>
              </Screen>
            </React.Fragment>
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.entities.doctors.list,
    loading: state.entities.doctors.loading,
    doctorAppointments: state.entities.appointments.selectedDoctorAppointments,
  };
};

const mapDispatchToProps = {
  createAppointment: (appointment) => createAppointment(appointment),
  loadAppointments: () => loadAppointments(),
  getDoctorAppointments: (doctorId) => getDoctorAppointments(doctorId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingCalenderScreen);

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    width: '100%',
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  topDoctorName: {
    ...style.text,
    fontWeight: 'bold',
  },
  topDoctorSubTitle: {
    ...style.text,
    color: colors.medium,
  },
  topDoctorDetails: {
    paddingLeft: 20,
  },
  headerSubTitle: {
    ...style.text,
  },
  topDoctorRating: {
    flexDirection: 'row',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  calendarContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  timeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  title: {
    ...style.text,
    fontWeight: 'bold',
    color: colors.medium,
  },
  availableTime: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  availableTimeItem: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...style.boxShaddow,
    marginBottom: 10,
    marginRight: 10,
  },
  timeText: {
    fontWeight: 'bold',
  },

  confirmation: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  bookingInfoContainer: {
    paddingHorizontal: 20,
  },
});
