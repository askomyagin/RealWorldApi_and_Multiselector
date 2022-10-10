import { combineReducers } from 'redux';
import { userReducer } from './user-reducer';
import { articlesReducer } from './articles-reducer';

export const combineReducer = combineReducers({
    user: userReducer,
    articles: articlesReducer,
});

export type RootState = ReturnType<typeof combineReducer>;
