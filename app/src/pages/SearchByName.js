import React, { useState, useEffect } from 'react'
import '../styles/SearchByName.css'
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';
import searchIcon from '../assets/search.png'

function SearchByName() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => setSearchResults(data.drinks || []))
            .catch(error => console.error('Error fetching drinks:', error));
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') return;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const filteredResults = data.drinks.filter(drink => drink.strDrink.toLowerCase().includes(searchTerm.toLowerCase()));
                setSearchResults(filteredResults || []);
            })
            .catch(error => console.error('Error fetching drinks:', error));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='searchByName'>
            <div className='search'>
                <div className='content'>
                    <h2>What are you looking for?</h2>
                    <div className='searchInput'>
                        <img src={searchIcon} />
                        <input placeholder='Enter the name of the drink'
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress} />
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