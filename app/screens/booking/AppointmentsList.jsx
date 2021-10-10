import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
Screen;
import colors from '../../config/colors';
import AppointmentItem from './AppointmentItem';
import ItemSeparator from '../../components/common/ItemSeparator';
import { connect } from 'react-redux';
import { loadMyAppointments } from '../../store/reducers/appointments';
import Screen from '../../components/Screen';

const AppointmentsList = ({ loadAppointments, appointments }) => {
  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <AppointmentItem appointment={item} />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
  },
});

const mapStateToProps = (state) => {
  return {
    appointments: state.entities.appointments.myAppointments,
  };
};
const mapDispatchToProps = {
  loadAppointments: () => loadMyAppointments(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsList);
