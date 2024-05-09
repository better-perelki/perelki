import React, { useState } from 'react';
import BeerIcon from '../assets/beer.png';
import HamburgerIcon from '../assets/hamburger.png';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const IsActiveLink = (path) => {
        return useLocation().pathname === path ? 'active' : '';
    };

    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/'>
                    <img src={BeerIcon} alt="Home" />
                </Link>
            </div>
            <div className='center'>
                <div className={`menuLinks ${isMenuOpen ? 'active' : ''}`}>
                    <Link to='/search-by-name' onClick={toggleMenu} className={IsActiveLink('/search-by-name')}>Search by name</Link>
                    <Link to='/search-by-ingredients' onClick={toggleMenu} className={IsActiveLink('/search-by-ingredients')}>Search by ingredients</Link>
                    <Link to='/all-recipes' className={useLocation().pathname === '/all-recipes' ? 'active' : ''}>All Recipes</Link>
                </div>
            </div>
            <div className='right'>
                <div className={`menuIcon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <img src={HamburgerIcon} alt="Menu" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;