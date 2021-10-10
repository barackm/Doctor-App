import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../config/colors';
import style from '../../config/style';
import capitalize from '../../utils/capitalize';
import renderProfilePicture from '../../utils/renderProfileImageUrl';

const TopDoctorsListItem = ({ navigation, doctor }) => {
  const { name, lastName } = doctor;
  return (
    <TouchableOpacity
      style={styles.topDoctorsContainer}
      onPress={() => navigation.navigate('Doctor', doctor)}
    >
      <View style={styles.topDoctorImageContainer}>
        <Image
          style={styles.topDoctorImage}
          source={{
            uri: renderProfilePicture(doctor.profilePicture, doctor),
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  mainView: { flex: 1 },
  title: {
    ...style.text,
    fontWeight: '900',
    fontSize: 40,
    color: colors.dark,
  },

  categories: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    width: 'auto',
    borderRadius: 30,
    paddingVertical: 6,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },

  categoryName: {
    ...style.text,
    color: colors.white,
    textTransform: 'uppercase',
  },
  categoryNumber: {
    width: 22,
    height: 22,
    backgroundColor: colors.white,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.primary,
  },

  topDoctorsContainer: {
    width: 160,
    backgroundColor: colors.white,
    marginRight: 10,
    borderRadius: 10,
    ...style.boxShaddow,
  },
  topDoctorImageContainer: {
    width: 140,
    height: 120,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  topDoctorImage: {
    width: '100%',
    height: '100%',
  },
  topDoctorDetails: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  topDoctorRating: {
    flexDirection: 'row',
    marginTop: 8,
  },
  doctorRating: {
    color: colors.medium,
  },
  stars: {
    flexDirection: 'row',
  },

  topDoctorName: {
    ...style.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  sortingDetails: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topDoctorSubTitle: {
    ...style.text,
    color: colors.medium,
    fontSize: 14,
    marginBottom: 5,
  },

  sortItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    ...style.boxShaddow,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  topRelated: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginHorizontal: 5,
  },
  doctorsList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default TopDoctorsListItem;
