import { combineReducers } from 'redux';
import entities from './entities';
import auth from './auth';

export default combineReducers({ entities, auth });
