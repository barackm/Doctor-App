import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';

import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import { connect } from 'react-redux';
import Screen from '../../components/Screen';
import Testitem from './TestItem';
import {
  loadPetientTests,
  loadTests,
  removeTest,
} from '../../store/reducers/tests';
import { sendLocation } from '../../store/reducers/location';
import Preloader from '../../components/common/Preloader';

const TestHistoryScreen = ({
  tests,
  loadTests,
  loading,
  removeTest,
  sendLocation,
  sending,
}) => {
  useEffect(() => {
    loadTests();
  }, []);
  const handeSendLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Location permission not granted, You need to allow the app to get your current location for the hospital to come and assist you.',
      );
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude, altitude } = location.coords;
    sendLocation({ latitude, longitude, altitude });
  };

  const handleSendEmergency = () => {
    Alert.alert(
      'Send Emergency',
      'Are you sure you want to notify an emergency to the Hospital? We will send the last uploaded test with your location to the Hospital so they can assist you.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => {
            handeSendLocation();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleRemoveTest = () => {
    Alert.alert(
      'Are you sure you want to delete this test?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            removeTest(t._id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Screen style={styles.container}>
      {sending ? (
        <Preloader />
      ) : (
        <>
          <FlatList
            data={tests}
            onRefresh={loadTests}
            refreshing={loading}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Testitem test={item} onRemoveTest={handleRemoveTest} />
            )}
            style={styles.list}
            ListEmptyComponent={() => (
              <View style={styles.noTestsContainer}>
                <Text style={styles.noTest}>
                  No tests Found, Pull to refresh
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={handleSendEmergency}
            style={styles.emergencyBtnContainer}
          >
            <MaterialIcons
              name="report-problem"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
    paddingTop: 5,
  },
  list: {},
  noTestsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noTest: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.medium,
  },
  emergencyBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 6,
  },
});

const mapStateToProps = (state) => {
  return {
    tests: state.entities.tests.list,
    loading: state.entities.tests.loading,
    sending: state.entities.location.loading,
  };
};
const mapDispatchToProps = {
  loadTests: () => loadTests(),
  loadPetientTests: (id) => loadPetientTests(id),
  removeTest: (id) => removeTest(id),
  sendLocation: (location) => sendLocation(location),
};

export default connect(mapStateToProps, mapDispatchToProps)(TestHistoryScreen);
