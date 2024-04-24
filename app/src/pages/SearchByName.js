import React, { useState, useEffect } from 'react'
import '../styles/SearchByName.css'
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';
import searchIcon from '../assets/search.png'
import NameSearcher from '../helpers/NameSearcher';

function SearchByName() {
    const { searchTerm, setSearchTerm, searchResults, handleInputChange } = NameSearcher();

    return (
        <div className='searchByName'>
            <div className='search'>
                <div className='content'>
                    <h2>What are you looking for?</h2>
                    <div className='searchInput'>
                        <img src={searchIcon} />
                        <input placeholder='Enter the name of the drink'
                            value={searchTerm}
                            onChange={handleInputChange} />
                    </div>

                    <div className='drinksList'>
                        {searchResults.map(drink => (
                            <Drink
                                key={drink.idDrink}
                                image={drink.strDrinkThumb}
                                name={drink.strDrink}
                                ingredients={GetIngredients(drink)}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SearchByName