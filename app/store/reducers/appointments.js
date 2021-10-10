import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import * as actions from '../actions/api';
import storage from '../../auth/storage';
import Toast from 'react-native-toast-message';

const url = '/appointments';

const slice = createSlice({
  name: 'appointments',
  initialState: {
    loading: false,
    list: [],
    error: null,
    lastFetch: null,
    selectedDoctorAppointments: [],
    myAppointments: [],
  },
  reducers: {
    appointmentsRequested: (appointments) => {
      appointments.loading = true;
      appointments.error = null;
    },
    appointmentsLoaded: (appointments, action) => {
      appointments.loading = false;
      appointments.error = null;
      appointments.list = action.payload;
    },
    appointmentsRequestFailed: (appointments, action) => {
      appointments.loading = false;
      appointments.error = action.payload;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: action.payload,
      });
    },
    appointmentCreated: (appointments, action) => {
      appointments.list = appointments.list.unshift(action.payload);
      appointments.selectedDoctorAppointments =
        appointments.selectedDoctorAppointments.push(action.payload);
      appointments.loading = false;
      appointments.error = null;
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Appointment created successfully',
      });
    },
    appointmentRemoved: (appointments, action) => {
      appointments.error = null;
      appointments.loading = false;
      appointments.myAppointments = appointments.myAppointments.filter(
        (a) => a._id !== action.payload._id,
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Appointment removed successfully',
      });
    },
    doctorAppointmentsLoaded: (appointments, action) => {
      appointments.loading = false;
      appointments.error = null;
      appointments.selectedDoctorAppointments = action.payload;
    },
    myAppointmentsLoaded: (appointments, action) => {
      appointments.loading = false;
      appointments.error = null;
      appointments.myAppointments = action.payload;
    },
  },
});

const {
  appointmentCreated,
  appointmentsLoaded,
  appointmentsRequestFailed,
  appointmentsRequested,
  appointmentRemoved,
  doctorAppointmentsLoaded,
  myAppointmentsLoaded,
} = slice.actions;
export default slice.reducer;

export const loadAppointments = () => async (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: appointmentsLoaded.type,
      url,
      method: 'GET',
    }),
  );
};

export const createAppointment = (appointment) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: appointmentCreated.type,
      url: `${url}/${appointment.doctorId}`,
      method: 'POST',
      data: {
        time: appointment.time,
        date: appointment.date,
        description: appointment.description,
      },
    }),
  );
};

export const removeAppointment = (appointmentId) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: appointmentRemoved.type,
      url: `${url}/${appointmentId}`,
      method: 'DELETE',
    }),
  );
};

export const getDoctorAppointments = (doctorId) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: doctorAppointmentsLoaded.type,
      url: `${url}/doctors/${doctorId}`,
      method: 'GET',
    }),
  );
};

export const loadMyAppointments = () => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: myAppointmentsLoaded.type,
      url,
      method: 'GET',
    }),
  );
};
