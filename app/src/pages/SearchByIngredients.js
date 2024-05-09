import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchByIngredients.css';
import searchIcon from '../assets/search2.png'
import Drink from '../components/Drink.js'
import GetIngredients from '../helpers/GetIngredients';

function SearchByIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [foundCocktails, setFoundCocktails] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                const ingredientList = data.drinks.map(drink => drink.strIngredient1.toLowerCase());
                setIngredients(ingredientList);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleAddIngredient = (ingredient) => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
        setSearchTerm('');
    };

    const handleRemoveIngredient = (ingredient) => {
        const newIngredients = selectedIngredients.filter(item => item !== ingredient);
        setSelectedIngredients(newIngredients);
    };

    const filteredIngredients = ingredients.filter(ingredient => {
        const words = ingredient.split(' ');
        return words.some(word => word.toLowerCase().startsWith(searchTerm));
    });

    const handleSearch = async () => {
        try {
            if (selectedIngredients.length === 0) {
                alert('Select at least one ingredient before searching.');
                return;
            }

            const ingredientsQueryFormatted = selectedIngredients.map(ingredient => ingredient.replace(/\s/g, '_')).join(',');


            const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredientsQueryFormatted}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cocktails');
            }
            const data = await response.json();

            setFoundCocktails(data.drinks);
        } catch (error) {
            console.error('Error searching cocktails:', error);
            alert('An error occurred while searching for drinks. Please try again later.');
        }
    };

    return (
        <div className="search-by-ingredients-container">
            <div className="ingredients-section">
                <h2>Choose ingredients:</h2>
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder="Search ingredients..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
                {searchTerm && (
                    <div className="searchResults">
                        {filteredIngredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="searchResult"
                                onClick={() => handleAddIngredient(ingredient)}
                            >
                                {ingredient}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="selected-ingredients-section">
                <h2>Selected ingredients:</h2>
                <div className="selected-ingredient-list">
                    {selectedIngredients.map((ingredient, index) => (
                        <div key={index} className="selected-ingredient">
                            {ingredient}
                            <button onClick={() => handleRemoveIngredient(ingredient)}>
                                Remove
                            </button>
                        </div>
                    ))}

                </div>
            </div>
            <div class="searchIcon">
                <img src={searchIcon} alt="Search" onClick={handleSearch} />
            </div>
            <div className="drinks">
                <div className='content'>
                    {Array.isArray(foundCocktails) && foundCocktails.length > 0 && (
                        <div className='content'>
                            <h2>Found drinks:</h2>
                            <div className='drinksList'>
                                {foundCocktails.map(drink => (
                                    <Drink
                                        key={drink.idDrink}
                                        id={drink.idDrink}
                                        image={drink.strDrinkThumb}
                                        name={drink.strDrink}
                                        ingredients={GetIngredients(drink)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchByIngredients;