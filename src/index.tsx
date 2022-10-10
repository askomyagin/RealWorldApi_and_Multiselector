import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { store } from './service';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Global, css } from '@emotion/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Global
                    styles={css`
                        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight&display=swap');
                        @import url('https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp');
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            font-family: 'Inter Tight', sans-serif;
                        }
                    `}
                />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
