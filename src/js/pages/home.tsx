import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Loader from '../components/loader';
import { getCurrentUser } from '@aws-amplify/auth';

// @ts-ignore
import coverPhoto from '../../img/cover.jpg';

const Home: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>(undefined);

    const getUserInfo = async () => {
        try {
            const user = await getCurrentUser();
            setUserInfo(user);
            
        } catch (error) {
            console.error('Error getting user info:', error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!userInfo) {
        return <Loader />
    }

    return (
        <div>
            <Header />
            <h1 className='page-heading'>The Editor Full of Flowers</h1>
            <div className='image-container'>
                <img className='cover' src={coverPhoto}></img>
            </div>
        </div>
    );
};

export default Home;
