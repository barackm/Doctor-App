import axios from 'axios';
import {
  apiCallBegan,
  doctorsLoadedSuccess,
  doctorsLoadedError,
} from '../actions/actionCreators';
const apiEndPoint = 'https://aqueous-gorge-50977.herokuapp.com/api/doctors';

export const loadDoctorsAsync = () => async (dispatch) => {
  dispatch(apiCallBegan);
  try {
    const response = await axios.get(apiEndPoint);
    dispatch(doctorsLoadedSuccess(response.data));
  } catch (error) {
    dispatch(doctorsLoadedError(error.message));
  }
};
