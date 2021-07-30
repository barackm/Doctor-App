import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import Screen from './Screen';
import colors from '../config/colors';
import AppointmentItem from './common/AppointmentItem';
import ItemSeparator from './common/ItemSeparator';
export default function AppointmentsList() {
  return (
    <Screen style={styles.container}>
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => <AppointmentItem />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
  },
});
