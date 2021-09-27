import { combineReducers } from '@reduxjs/toolkit';
import doctors from './doctors';
import appointments from './appointments';

export default combineReducers({ doctors, appointments });
