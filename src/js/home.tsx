import React from 'react';
import Header from './components/header';
import { createRoot } from 'react-dom/client';
import { isPage } from './utils/utils';
import { withAuthenticator } from '@aws-amplify/ui-react';

if (isPage('home')) {
    document.body.innerHTML = '<div id="home"></div>';
    const root = createRoot(document.getElementById('home')!);
    const Home = () => (
        <div>
            <Header />
            <h1 className='page-heading'>The Editor Full of Flowers</h1>
            <div className='image-container'>
                <img className='cover' src='../img/cover.jpg'></img>
            </div>
        </div>
    );
    const App = withAuthenticator(Home);
    root.render(<App />);
}

