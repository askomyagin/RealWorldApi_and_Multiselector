import { ArticleActionTypes, ArticleState, ArticleAction } from '../types/articles-types';

const initialState: ArticleState = {
    error: null,
    articles: [],
    loading: false,
};

export const articlesReducer = (state = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
        case ArticleActionTypes.TRY_FETCH_ARTICLES:
            return { loading: true, articles: [], error: null };
        case ArticleActionTypes.FETCH_ARTICLES_SUCCESS:
            return { loading: false, articles: action.payload, error: null };
        case ArticleActionTypes.FETCH_ARTICLES_FAIL:
            return { loading: false, articles: [], error: action.payload };
        default:
            return state;
    }
};
