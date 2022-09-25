import { combineReducers } from 'redux';
import { userReducer } from './user-reducer';

export const combineReducer = combineReducers({
    user: userReducer,
});
