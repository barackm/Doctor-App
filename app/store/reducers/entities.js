import { combineReducers } from '@reduxjs/toolkit';
import doctors from './doctors';
import appointments from './appointments';
import conversations from './conversations';
import tests from './tests';

export default combineReducers({ doctors, appointments, conversations, tests });
