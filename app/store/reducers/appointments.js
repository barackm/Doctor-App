import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import * as actions from '../actions/api';
import storage from '../../auth/storage';

const url = '/appointments';

const slice = createSlice({
  name: 'appointments',
  initialState: {
    loading: false,
    list: [],
    error: null,
    lastFetch: null,
    selectedDoctorAppointments: [
      {
        date: 'Fri Oct 01 2021 00:00:00 GMT+0200 (CAT)',
        description: '',
        time: '11:00 am',
      },
      {
        date: 'Wed Sep 29 2021 00:00:00 GMT+0200 (CAT)',
        description: '',
        time: '02:00 pm',
      },
      {
        date: 'Thu Sep 23 2021 00:00:00 GMT+0200 (CAT)',
        description: '',
        time: '03:00 pm',
      },
    ],
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
    },
    appointmentCreated: (appointments, action) => {
      appointments.list = appointments.list.unshift(action.payload);
      appointments.selectedDoctorAppointments =
        appointments.selectedDoctorAppointments.push(action.payload);
      appointments.loading = false;
      appointments.error = null;
    },
    appointmentRemoved: (appointments, action) => {
      appointments.error = null;
      appointments.loading = false;
      appointments.list = appointments.list.filter(
        (a) => a._id !== action.payload._id,
      );
    },
    doctorAppointmentsLoaded: (appointments, action) => {
      appointments.loading = false;
      appointments.error = null;
      appointments.selectedDoctorAppointments = action.payload;
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

export const removeAppointment = (appointment) => async (dispatch) => {
  const currentUser = jwtDecode(await storage.getAuthToken());
  dispatch(
    actions.apiCallBegan({
      onStart: appointmentsRequested.type,
      onError: appointmentsRequestFailed.type,
      onSuccess: appointmentRemoved.type,
      url: `${url}/${currentUser._id}/${appointment._id}`,
      method: 'DELETE',
      data: appointment,
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
