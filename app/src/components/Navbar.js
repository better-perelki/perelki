import React from 'react';
import Beer from '../assets/beer.png';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/'>
                    <img src={Beer} />
                </Link>
            </div>
            <div className='center'>
                <Link to='/search-by-name' className={useLocation().pathname === '/search-by-name' ? 'active' : ''}>Search by name</Link>
                <Link to='/search-by-ingredients' className={useLocation().pathname === '/search-by-ingredients' ? 'active' : ''}>Search by ingredients</Link>
            </div>
        </div>
    )
}

export default Navbar