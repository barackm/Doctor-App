import { combineReducers } from '@reduxjs/toolkit';
import doctors from './doctors';
import appointments from './appointments';
import conversations from './conversations';
import tests from './tests';
import location from './location';

export default combineReducers({
  doctors,
  appointments,
  conversations,
  tests,
  location,
});
