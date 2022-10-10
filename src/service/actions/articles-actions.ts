import { Dispatch } from 'redux';
import { RealWorldService } from '../realworld-service';
import { ArticleAction, ArticleActionTypes } from '../types/articles-types';

const RealWorld = new RealWorldService();

export const getArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
    dispatch({ type: ArticleActionTypes.TRY_FETCH_ARTICLES });
    RealWorld.makeGetRequest('/articles', true)
        .then((res) => {
            dispatch({
                type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS,
                payload: res.data.articles,
            });
        })
        .catch((error) =>
            dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_FAIL, payload: error })
        );
};
