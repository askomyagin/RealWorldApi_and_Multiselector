import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useActions } from '../hooks/useActions';
import { Article } from '../service/types/articles-types';
import { RealWorldService } from '../service/realworld-service';

const RealWorld = new RealWorldService();

interface Props {
    article: Article;
}

function CreateDateTime(string: string) {
    const mass = string.split(/[T.]/).splice(0, 2);
    const date = mass[0].split('-').reverse().join('-');
    const time = mass[1].substr(0, 5);
    return `Дата публикации: ${date}, ${time}`;
}

const UpperCase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ArticleItem = ({ article }: Props) => {
    const { slug, title, description, body, createdAt, tagList, author } = article;
    const { getArticles } = useActions();

    const DeleteArticle = useCallback(() => {
        RealWorld.makeDeleteRequest(`/articles/${slug}`, true).then(() => getArticles());
    }, [slug, getArticles]);

    return (
        <ArticleContainer>
            <ArticleHeaderContainer>
                <ArticleTitle>{UpperCase(title)}</ArticleTitle>
                <Span className="material-icons-outlined" onClick={() => DeleteArticle()}>
                    delete
                </Span>
            </ArticleHeaderContainer>
            <DescriptionContainer>{`(${UpperCase(description)})`}</DescriptionContainer>
            <BodyContainer>{UpperCase(body)}</BodyContainer>

            <Tags>{tagList.map((el) => `#${el} `)}</Tags>
            <Line />
            <FooterContainer>
                <Author>Имя автора: {author.username}</Author>
                <CreateDate>{CreateDateTime(createdAt)}</CreateDate>
            </FooterContainer>
        </ArticleContainer>
    );
};

const ArticleContainer = styled.div`
    width: 100%;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px;
    background-color: #f0f0f0;
`;

const ArticleHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ArticleTitle = styled.div`
    font-size: 16px;
    font-weight: bolder;
`;

const DescriptionContainer = styled.div`
    font-size: 13px;
    font-weight: lighter;
    margin-bottom: 15px;
`;

const BodyContainer = styled.div`
    font-size: 17px;
    font-weight: lighter;
    margin-bottom: 15px;
    white-space: break-spaces;
`;

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Author = styled.div`
    font-size: 15px;
`;

const CreateDate = styled.div`
    font-size: 15px;
`;
const Tags = styled.div`
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
`;
const Line = styled.div`
    width: 90%;
    border: 0.5px solid grey;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Span = styled.span`
    color: black;
    cursor: pointer;
    :hover {
        color: #999999;
    }
`;
