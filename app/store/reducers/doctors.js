import * as actions from '../actions/actionCreators';
import {
  DOCTORS_LOADED_SUCCESS,
  DOCTORS_LOADED_ERROR,
  API_CALL_BEGAN,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  list: [],
  error: null,
  lastFech: null,
};

const doctors = (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_BEGAN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCTORS_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: null,
      };
    case DOCTORS_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default doctors;
