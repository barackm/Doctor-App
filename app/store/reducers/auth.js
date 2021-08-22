import {
  API_CALL_BEGAN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
  isAuthenticated: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_BEGAN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
