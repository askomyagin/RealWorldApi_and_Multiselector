import styled from '@emotion/styled';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';

export const Header = () => {
    const { user } = useTypedSelector(({ user }) => ({ ...user }));
    const logOut = useLogOut();

    return (
        <HeaderContainer>
            <TitleContainer>
                <Title>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                        Collection Of Articles
                    </Link>
                </Title>
            </TitleContainer>

            {user && (
                <>
                    <PageContainer>
                        <PageName>
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                                Статьи
                            </Link>
                        </PageName>
                        <PageName>
                            <Link
                                to={'/create-article'}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                Новая статья
                            </Link>
                        </PageName>
                    </PageContainer>

                    <UserContainer>
                        <UserName>{user?.username}</UserName>
                        <LogOutButton onClick={logOut}>Выйти</LogOutButton>
                    </UserContainer>
                </>
            )}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    width: 95%;
    align-items: center;
    display: flex;
    height: 50px;
    margin: auto;
    background-color: #f0f0f0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    justify-content: space-around;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 20px;
`;

const TitleContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
`;

const PageContainer = styled.div`
    display: flex;
    width: 50%;
    font-size: 15px;
`;

const PageName = styled.div`
    margin-right: 50px;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const UserContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    align-items: center;
`;

const LogOutButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: #94c5ff;
    font-size: 15px;
    cursor: pointer;
    :hover {
        border: 1px solid black;
        padding: 9px;
    }
`;

const UserName = styled.div`
    color: black;
    font-size: 18px;
    font-weight: 600;
`;
