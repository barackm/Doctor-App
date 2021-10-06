import { combineReducers } from '@reduxjs/toolkit';
import doctors from './doctors';
import appointments from './appointments';
import conversations from './conversations';

export default combineReducers({ doctors, appointments, conversations });
