import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import style from '../../config/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';

import capitalize from '../../utils/capitalize';
import renderProfilePicture from '../../utils/renderProfileImageUrl';
import storage from '../../auth/storage';

const DoctorProfileScreen = (props) => {
  const { navigation, route } = props;
  const [currentUser, setCurrentUser] = React.useState(null);
  const { _id, name, lastName, phoneNumber, email, imageUrl } = route.params;
  storage.getAuthToken().then((token) => {
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  });
  return (
    <ScrollView style={styles.mainView}>
      <Screen style={styles.container}>
        <View style={styles.headerBg}></View>
        <View style={styles.profileHeader}>
          <View style={styles.headerUp}>
            <View style={styles.profileImage}>
              <Image
                style={styles.profile}
                source={{
                  uri: renderProfilePicture(imageUrl, route.params),
                }}
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
                <Text style={styles.doctorRating}>Rating:</Text>
                <Text style={styles.rating}>5.0</Text>
                <View style={styles.stars}>
                  <FontAwesome name="star" size={20} color={colors.gold} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  currentUser.status === 'Pending' ||
                  currentUser.status === 'Inactive'
                    ? alert(
                        'You need to be approved by an admin to chat with Doctor since you are in status pending or inactive. Kindly contact the Hospital for further explainations',
                      )
                    : navigation.navigate('Chat', {
                        id: _id,
                        name,
                        image:
                          'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        currentUser,
                        patientId: null,
                      })
                }
                style={styles.headerSubTitle}
              >
                <Text style={styles.about}>SEND A MESSAGE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerDown}>
            <View style={styles.patientsNumber}>
              <View style={styles.patient}>
                <Image
                  style={styles.patientImage}
                  source={{
                    uri: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Tynan-Allan.jpeg',
                  }}
                />
              </View>
              <View style={[styles.patient, styles.patientElse]}>
                <Image
                  style={styles.patientImage}
                  source={{
                    uri: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
                  }}
                />
              </View>
              <View
                style={[styles.patient, { transform: [{ translateX: -16 }] }]}
              >
                <Image
                  style={styles.patientImage}
                  source={{
                    uri: 'https://perfectczechwomen.com/wp-content/uploads/2019/04/New-Profile-20-500x536.jpg',
                  }}
                />
              </View>
              <View
                style={[
                  styles.patient,
                  {
                    backgroundColor: colors.lightDark,
                    transform: [{ translateX: -26 }],
                  },
                ]}
              >
                <Text style={styles.patientCount}>99+</Text>
              </View>
              <View style={styles.patientNameContainer}>
                <Text style={styles.patientName}>Patients</Text>
              </View>
            </View>
            <View style={styles.book}>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() =>
                  currentUser.status === 'Pending' ||
                  currentUser.status === 'Inactive'
                    ? alert(
                        'You need to be approved by an admin to book an appointment with a doctor since you are in status pending or inactive. Kindly contact the Hospital for further explainations.',
                      )
                    : navigation.navigate('Booking', _id)
                }
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.bookTitle}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={[styles.availabilityItem, { marginRight: 10 }]}>
            <Text style={styles.hospitalTitle}>Ibn Sina Hospital</Text>
            <Text style={styles.days}>Monday - Wednesday</Text>
            <TouchableOpacity style={styles.seeMoreBtn}>
              <Text style={styles.seeMore}>SEE MORE</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.availabilityItem,
              { marginLeft: 10, backgroundColor: colors.white },
            ]}
          >
            <Text style={styles.hospitalTitle}>Ibn Sina Hospital</Text>
            <Text style={styles.days}>Tuesday - Saturday</Text>
            <TouchableOpacity
              style={[styles.seeMoreBtn, { backgroundColor: colors.lightDark }]}
            >
              <Text style={[styles.seeMore, { color: colors.medium }]}>
                SEE MORE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.biographyDetails}>
          <Text style={styles.biographyTitle}>Biography</Text>
          <View style={styles.biagraphyContainer}>
            <View style={styles.educationErea}>
              <Text style={styles.educationTitle}>MEDICAL SCHOOL</Text>
              <Text style={styles.educationDetail}>
                Boston University School of Medecine
              </Text>
            </View>
            <View style={styles.educationErea}>
              <Text style={styles.educationTitle}>EDUCATION</Text>
              <Text style={styles.educationDetail}>
                M.B.B.S F.C.P.S. Child specialist
              </Text>
            </View>
            <View style={styles.educationErea}>
              <Text style={styles.educationTitle}>LOCALISATION</Text>
              <Text style={styles.educationDetail}>KIGALI RWANDA</Text>
            </View>
            <View style={styles.educationErea}>
              <Text style={styles.educationTitle}>CONTACTS</Text>
              <Text style={styles.educationDetail}>{phoneNumber}</Text>
              <Text style={styles.educationDetail}>Email: {email}</Text>
            </View>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  headerBg: {
    width: '100%',
    height: 200,
    backgroundColor: colors.primary,
  },
  profileHeader: {
    width: '90%',
    height: 230,
    backgroundColor: colors.white,
    borderRadius: 20,
    ...style.boxShaddow,
    position: 'absolute',
    top: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerUp: {
    flexDirection: 'row',
  },
  profile: {
    width: '100%',
    height: '100%',
  },
  topDoctorDetails: {
    paddingLeft: 20,
    textTransform: 'uppercase',
  },
  topDoctorName: {
    ...style.text,
    fontWeight: 'bold',
    fontSize: 18,
  },

  topDoctorSubTitle: {
    ...style.text,
    color: colors.medium,
  },

  topDoctorRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...style.text,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },

  doctorRating: {
    ...style.text,
    color: colors.medium,
  },
  headerSubTitle: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  about: {
    ...style.text,
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.white,
  },
  book: {
    flexDirection: 'row',
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookTitle: {
    ...style.text,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 10,
  },

  headerDown: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  patient: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientImage: {
    width: '100%',
    height: '100%',
  },
  patientsNumber: {
    flexDirection: 'row',
  },
  patientElse: {
    transform: [{ translateX: -8 }],
  },

  patientCount: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  patientNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -20 }],
  },
  availabilityContainer: {
    marginTop: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  availabilityItem: {
    flex: 1,
    backgroundColor: colors.lightDark,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  hospitalTitle: {
    fontWeight: 'bold',
  },
  days: {
    color: colors.medium,
    fontSize: 12,
    marginVertical: 2,
  },
  seeMore: {
    fontSize: 15,
    color: colors.white,
  },
  seeMoreBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biographyDetails: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  biographyTitle: {
    ...style.text,
    fontWeight: 'bold',
    color: colors.medium,
  },
  educationErea: {
    marginBottom: 10,
  },
  biagraphyContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  educationTitle: {
    ...style.text,
    fontWeight: 'bold',
    color: colors.lighter,
    fontSize: 15,
  },
  educationDetail: {
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: 5,
  },
});

export default DoctorProfileScreen;
