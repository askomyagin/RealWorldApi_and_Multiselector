import { SignIn } from './signIn';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignUp } from './signUp';
import { Header } from './header';
import { Articles } from './acticles';
import { NewArticle } from './new-article';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styled from '@emotion/styled';
import { SpinnerCircularSplit } from 'spinners-react';

function App() {
    const { user, loading, error } = useTypedSelector((state) => state.user);

    if (loading)
        return (
            <ArticlesContainer>
                <SpinnerCircularSplit color={'black'} secondaryColor={'#f0f0f0'} size={50} />
            </ArticlesContainer>
        );

    return (
        <div>
            <Header />
            <Routes>
                {!user && <Route path="/signIn" element={<SignIn />} />}
                {!user && <Route path="/signUp" element={<SignUp />} />}
                {!user && <Route path="*" element={<Navigate to="/signIn" />} />}
                {user && <Route path="/" element={<Articles />} />}
                {user && <Route path="/create-article" element={<NewArticle />} />}
                {user && <Route path="*" element={<Navigate to="/" />} />}
            </Routes>
        </div>
    );
}

export default App;

const ArticlesContainer = styled.div`
    width: 95%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
