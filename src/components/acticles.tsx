import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ArticleItem } from './article-item';
import { SpinnerCircularSplit } from 'spinners-react';

export const Articles = () => {
    const { articles, loading, error } = useTypedSelector((state) => state.articles);
    const { getArticles } = useActions();

    useEffect(() => {
        getArticles();
    }, []);

    if (loading)
        return (
            <ArticlesContainer>
                <SpinnerCircularSplit color={'black'} secondaryColor={'#f0f0f0'} size={50} />
            </ArticlesContainer>
        );

    return (
        <ArticlesContainer>
            <ArticlesTitle>Ваши статьи</ArticlesTitle>
            {articles.length > 0 ? (
                articles.map((article) => <ArticleItem key={article.slug} article={article} />)
            ) : (
                <NoneArticles>Нет статей</NoneArticles>
            )}
        </ArticlesContainer>
    );
};

const ArticlesContainer = styled.div`
    width: 95%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ArticlesTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const NoneArticles = styled.div`
    font-size: 15px;
    margin-bottom: 20px;
`;
