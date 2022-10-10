import * as userActions from './user-actions';
import * as articlesActions from './articles-actions';

export const Actions = { ...userActions, ...articlesActions };
