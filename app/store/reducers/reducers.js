import { combineReducers } from '@reduxjs/toolkit';
import entities from './entities';
import auth from './auth';

export default combineReducers({ entities, auth });
