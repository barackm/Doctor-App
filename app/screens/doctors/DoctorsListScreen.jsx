import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import style from '../../config/style';
import ListItem from '../../components/ListItem';
import TopDoctorsListItem from './TopDoctorsListItem';

import Preloader from '../../components/common/Preloader';
import { loadDoctors } from '../../store/reducers/doctors';

const DoctorsListScreen = ({
  loading,
  doctors,
  loadDoctors,
  navigation,
  currentUser,
}) => {
  useEffect(() => {
    loadDoctors();
  }, []);
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Doctors</Text>
        <TouchableOpacity style={styles.categoryItem}>
          <Text style={styles.categoryName}>Categories</Text>
          <View style={styles.categoryNumber}>
            <Text style={styles.number}>5</Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Preloader />
      ) : (
        <ScrollView style={styles.mainView}>
          <ScrollView
            horizontal={true}
            style={styles.categories}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => loadDoctors()}
              />
            }
          >
            {doctors.map((doctor) => (
              <TopDoctorsListItem
                navigation={navigation}
                key={doctor._id}
                doctor={doctor}
                currentUser={currentUser}
              />
            ))}
          </ScrollView>
          <View style={styles.sortingDetails}>
            <TouchableOpacity style={styles.sortItem}>
              <Text style={styles.topRelated}>Top Rated </Text>
              <Entypo
                name="chevron-small-down"
                size={24}
                color={colors.medium}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortItem}>
              <MaterialCommunityIcons
                name="sort-alphabetical-variant"
                size={20}
                color={colors.medium}
              />
              <Text style={styles.topRelated}>Sort </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortItem}>
              <Octicons name="settings" size={20} color={colors.medium} />
              <Text style={styles.topRelated}>Filter </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.doctorsList}>
            {doctors.map((doctor) => (
              <ListItem
                onPress={() => navigation.navigate('Doctor', doctor)}
                key={doctor._id}
                doctor={doctor}
                currentUser={currentUser}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.entities.doctors.list,
    loading: state.entities.doctors.loading,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = {
  loadDoctors: () => loadDoctors(),
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorsListScreen);

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
