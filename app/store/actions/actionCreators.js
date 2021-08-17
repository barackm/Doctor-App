import {
  API_CALL_BEGAN,
  DOCTORS_LOADED_ERROR,
  DOCTORS_LOADED_SUCCESS,
} from './actionTypes';

export const apiCallBegan = () => ({
  type: API_CALL_BEGAN,
});

export const doctorsLoadedSuccess = (doctors) => ({
  type: DOCTORS_LOADED_SUCCESS,
  payload: doctors,
});

export const doctorsLoadedError = (error) => ({
  type: DOCTORS_LOADED_ERROR,
  payload: error,
});
