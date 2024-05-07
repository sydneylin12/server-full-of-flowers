import React from 'react';
import Header from '../components/header';

const Home: React.FC = () => (
    <div>
        <Header />
        <h1 className='page-heading'>The Editor Full of Flowers</h1>
        <div className='image-container'>
            <img className='cover' src='../img/cover.jpg'></img>
        </div>
    </div>
);

export default Home;
