import React from 'react';
import logo from '../assets/logo.png';
import arrow from '../assets/chevron-down-2.png';
import PopularList from '../helpers/PopularList';
import '../styles/Home.css';

function Home() {
    return (
        <div className='home'>
            <Header />
            <PopularSection />
        </div>
    );
}

function Header() {
    return (
        <div className='main'>
            <img src={logo} className='logo' alt='Logo' />
            <img src={arrow} className='arrow' alt='Arrow' />
        </div>
    );
}

function PopularSection() {
    return (
        <div className='popular'>
            <div className='content'>
                <h2>You must try these!</h2>
                <PopularList />
            </div>
        </div>
    );
}

export default Home;