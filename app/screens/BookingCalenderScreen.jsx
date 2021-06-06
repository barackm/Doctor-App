import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import { Calendar } from "react-native-calendario";
import colors from "../config/colors";
import style from "../config/style";
import AppInput from "../components/forms/AppInput";
import { FontAwesome } from "@expo/vector-icons";

export default function BookingCalenderScreen() {
  const morningSlots = [
    { id: 1, time: "10:10 am", taken: true, active: false },
    { id: 2, time: "10:30 am", taken: false, active: false },
    { id: 3, time: "10:50 am", taken: false, active: false },
    { id: 4, time: "11:20 am", taken: false, active: false },
    { id: 5, time: "11:40 am", taken: true, active: false },
  ];
  const afternoonSlots = [
    { id: 1, time: "02:00 pm", taken: true, active: false },
    { id: 2, time: "02:20 pm", taken: false, active: true },
    { id: 3, time: "02:40 pm", taken: false, active: false },
  ];
  const eveningSlots = [
    { id: 1, time: "07:00 pm", taken: false, active: false },
    { id: 2, time: "07:20 pm", taken: true, active: false },
    { id: 3, time: "07:40 pm", taken: false, active: false },
    { id: 4, time: "08:00 pm", taken: false, active: false },
    { id: 5, time: "08:20 pm", taken: false, active: false },
  ];

  const renderBackgroundColor = (item, colors) => {
    let color = "";
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
    let color = "";
    if (item.active && !item.taken) {
      color = colors.white;
    } else if (item.taken && !item.active) {
      color = colors.white;
    } else {
      color = colors.medium;
    }

    return color;
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <ScrollView style={styles.mainView} orientation="vertical">
        <Screen style={styles.container}>
          <View style={styles.header}>
            <View style={styles.doctorImage}>
              <Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.topDoctorDetails}>
              <Text style={styles.topDoctorName} numberOfLines={1}>
                Dr. Nathan Fox
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
              <Text style={styles.headerSubTitle}>Book an Appointment</Text>
            </View>
          </View>
          <View style={styles.calendarContainer}>
            <Calendar
              scrollEnabled={false}
              onChange={(range) => console.log(range)}
              minDate={new Date(2018, 3, 1)}
              startDate={new Date(2018, 3, 1)}
              endDate={new Date(2018, 3, 30)}
              numberOfMonths={1}
              theme={{
                activeDayColor: {},
                monthTitleTextStyle: {
                  color: "#6d95da",
                  fontWeight: "300",
                  fontSize: 16,
                },
                emptyMonthContainerStyle: {},
                emptyMonthTextStyle: {
                  fontWeight: "200",
                },
                weekColumnsContainerStyle: {},
                weekColumnStyle: {
                  paddingVertical: 5,
                },
                weekColumnTextStyle: {
                  color: "#b6c1cd",
                  fontSize: 14,
                  fontWeight: "bold",
                },
                nonTouchableDayContainerStyle: {},
                nonTouchableDayTextStyle: {},
                startDateContainerStyle: {},
                endDateContainerStyle: {},
                dayContainerStyle: {},
                dayTextStyle: {
                  color: "#2d4150",
                  fontWeight: "500",
                  fontSize: 15,
                },
                dayOutOfRangeContainerStyle: {},
                dayOutOfRangeTextStyle: {},
                todayContainerStyle: {},
                todayTextStyle: {
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                },
                activeDayContainerStyle: {
                  backgroundColor: colors.primary,
                },
                activeDayTextStyle: {
                  color: "white",
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
                {morningSlots.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.availableTimeItem,
                      { backgroundColor: renderBackgroundColor(item, colors) },
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
                {afternoonSlots.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.availableTimeItem,
                      { backgroundColor: renderBackgroundColor(item, colors) },
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
              <Text style={styles.title}>Evening Slots</Text>
              <View style={styles.availableTime}>
                {eveningSlots.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.availableTimeItem,
                      { backgroundColor: renderBackgroundColor(item, colors) },
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
              label="Desciption"
            />
          </View>

          <View style={styles.confirmation}>
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    width: "100%",
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  topDoctorName: {
    ...style.text,
    fontWeight: "bold",
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
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
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
    fontWeight: "bold",
    color: colors.medium,
  },
  availableTime: {
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  availableTimeItem: {
    width: "30%",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    ...style.boxShaddow,
    marginBottom: 10,
    marginRight: 10,
  },
  timeText: {
    fontWeight: "bold",
  },

  confirmation: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  submitBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    fontWeight: "bold",
    ...style.text,
    color: colors.white,
  },

  bookingInfoContainer: {
    paddingHorizontal: 20,
  },
});
