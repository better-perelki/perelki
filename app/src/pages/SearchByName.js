import React,  { useState, useEffect } from 'react';
import '../styles/SearchByName.css';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';
import searchIcon from '../assets/search.png';
import useNameSearcher from '../helpers/NameSearcher';
import IconRandom from '../components/IconRandom';


function SearchByName() {
    const { searchTerm, setSearchTerm, searchResults, handleInputChange } = useNameSearcher();
    const [showRandomIcon, setShowRandomIcon] = useState(false);

    const renderDrinks = () => {
        return searchResults.map(drink => (
            <Drink
                key={drink.idDrink}
                id={drink.idDrink}
                image={drink.strDrinkThumb}
                name={drink.strDrink}
                ingredients={GetIngredients(drink)}
            />
        ));
    };

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
                    <div className='drinksList'>
                        {renderDrinks()}
                    </div>
                </div>
            </div>
            {showRandomIcon && <IconRandom />}
        </div>
    );
}

export default SearchByName;
