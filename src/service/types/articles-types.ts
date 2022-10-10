export enum ArticleActionTypes {
    TRY_FETCH_ARTICLES = 'TRY_FETCH_ARTICLES',
    FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
    FETCH_ARTICLES_FAIL = 'FETCH_ARTICLES_FAIL',
}

export interface ArticleState {
    loading: boolean;
    error: string | null;
    articles: Article[];
}

export interface Author {
    username: string;
    bio: string;
    image: string;
    following?: boolean;
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    udpatedAt: string;
    tagList: string[];
    favoritesCount: number;
    favorited: boolean;
    author: Author;
}

export interface ArticleAction {
    type: keyof typeof ArticleActionTypes;
    payload?: any;
}

export interface CreateArticle {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}
