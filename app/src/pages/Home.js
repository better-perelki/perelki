import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Home.css'
import arrow from '../assets/chevron-down-2.png'
import PopularList from '../helpers/PopularList'

function Home() {

    return (
        <div className='home'>
            <div className='main'>
                <img src={logo} className='logo' />
                <img src={arrow} className='arrow' />
            </div>
            <div className='popular'>
                <div className='content'>
                    <h2>You must try these!</h2>
                    <PopularList />
                </div>
            </div>
        </div>
    )
}

export default Home