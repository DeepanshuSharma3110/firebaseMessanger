import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/storage';
import App from './App';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider store={store} >
    <App />
    </Provider>
    </CookiesProvider>
);
