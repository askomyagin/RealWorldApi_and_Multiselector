import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { combineReducer } from './reducers';

export const store = createStore(combineReducers({ combineReducer }), applyMiddleware(thunk));
