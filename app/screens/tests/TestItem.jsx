import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import style from '../../config/style';

const Testitem = ({ test, onRemoveTest }) => {
  return (
    <View style={styles.container}>
      <View style={styles.testTime}>
        <Text style={styles.testTimeText}>Taken Today at 16:40</Text>
        <TouchableOpacity onPress={() => onRemoveTest(test)}>
          <EvilIcons name="trash" size={35} color={colors.danger} />
        </TouchableOpacity>
      </View>
      <View style={styles.testDetails}>
        <View style={styles.testItem}>
          <Text style={styles.testItemText}>Heart Beat Rate</Text>
          <Text style={styles.testItemValue}>{test.heartRate}</Text>
        </View>
        <View style={styles.testItem}>
          <Text style={styles.testItemText}>Blood Pressure</Text>
          <Text style={styles.testItemValue}>{test.bloodPressure}</Text>
        </View>
        <View style={styles.testItem}>
          <Text style={styles.testItemText}>Body Temperature</Text>
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
