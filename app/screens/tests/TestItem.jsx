import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import style from '../../config/style';
import moment from 'moment';

const Testitem = ({ test, onRemoveTest, route }) => {
  const renderTestColor = (t, colors) => {
    if (
      t.heartRate.includes('⚠️') ||
      t.bloodPressure.includes('⚠️') ||
      t.temperature.includes('⚠️')
    ) {
      return {
        bg: '#ffd7d6',
        text1: colors.primary,
        text2: colors.medium,
      };
    }
    return {
      bg: colors.white,
      text1: colors.lighter,
      text2: colors.medium,
    };
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: renderTestColor(test, colors).bg,
      }}
    >
      <View
        style={{ ...styles.testTime, paddingVertical: route.params ? 5 : 0 }}
      >
        <Text
          style={{
            ...styles.testTimeText,
            color: renderTestColor(test, colors).text2,
          }}
        >
          Uploaded {moment(test.createdAt).fromNow()}
        </Text>
        {route.params ? (
          <></>
        ) : (
          <TouchableOpacity onPress={() => onRemoveTest(test)}>
            <EvilIcons name="trash" size={35} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.testDetails}>
        <View style={styles.testItem}>
          <Text
            style={{
              ...styles.testItemText,
              color: renderTestColor(test, colors).text1,
            }}
          >
            Heart Beat Rate
          </Text>
          <Text style={styles.testItemValue}>{test.heartRate}</Text>
        </View>
        <View style={styles.testItem}>
          <Text
            style={{
              ...styles.testItemText,
              color: renderTestColor(test, colors).text1,
            }}
          >
            Blood Pressure
          </Text>
          <Text style={styles.testItemValue}>{test.bloodPressure}</Text>
        </View>
        <View style={styles.testItem}>
          <Text
            style={{
              ...styles.testItemText,
              color: renderTestColor(test, colors).text1,
            }}
          >
            Body Temperature
          </Text>
          <Text style={styles.testItemValue}>{test.temperature}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    ...style.boxShaddow,
    marginVertical: 5,
  },
  testTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testTimeText: {
    fontWeight: 'bold',
    color: colors.medium,
  },
  testItem: {
    marginBottom: 2,
  },
  testItemText: {
    ...style.text,
    fontWeight: '500',
    color: colors.lighter,
    fontSize: 15,
    textTransform: 'uppercase',
  },
  testItemValue: {
    fontWeight: 'bold',
    color: colors.medium,
  },
});

export default Testitem;
