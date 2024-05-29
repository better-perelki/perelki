import React, { useState, useEffect } from 'react';
import '../styles/SearchByName.css';
import searchIcon from '../assets/search.png';
import useNameSearcher from '../helpers/NameSearcher';
import IconRandom from '../components/IconRandom';
import RenderDrinks from '../helpers/RenderDrinks';

function SearchByName() {
    const { searchTerm, searchResults, handleInputChange } = useNameSearcher();
    const [showRandomIcon, setShowRandomIcon] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRandomIcon(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='searchByName'>
            <div className='search'>
                <h2>What are you looking for?</h2>
                <div className='searchInput'>
                    <img src={searchIcon} alt='Search Icon' />
                    <input
                        placeholder='Enter the name of the drink'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='drinks'>
                <div className='content'>
                    {RenderDrinks(searchResults)}
                </div>
            </div>
            {showRandomIcon && <IconRandom />}
        </div>
    );
}

export default SearchByName;
