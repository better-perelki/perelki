import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchByIngredients.css';
import Drink from '../components/Drink.js'
import searchIcon from '../assets/search.png';
import removeHoveredIcon from '../assets/remove.png'
import removeIcon from '../assets/remove1.png'
import GetIngredients from '../helpers/GetIngredients.js';
import useHover from '../helpers/useHover';

function SearchByIngredients() {
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [foundCocktails, setFoundCocktails] = useState([]);
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                const ingredientList = data.drinks.map(drink => drink.strIngredient1.toLowerCase());
                setIngredientsList(ingredientList);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const handleSearchTermChange = (e) => setSearchTerm(e.target.value.toLowerCase());

    const handleAddSelectedIngredient = (ingredient) => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
        setSearchTerm('');
    };

    const handleRemoveSelectedIngredient = (ingredient) => setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));

    const filteredIngredients = ingredientsList.filter(ingredient => ingredient.toLowerCase().includes(searchTerm));

    const handleSearchCocktails = async () => {
        try {
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

    useEffect(() => {
        handleSearchCocktails();
    }, [selectedIngredients]);

    return (
        <div className="search-by-ingredients-container">
            <div className='content'>
                <div className="ingredients-section">
                    <h2>Choose ingredients:</h2>
                    <div className="searchInput">
                        <img src={searchIcon} alt='Search Icon' />
                        <input
                            type="text"
                            placeholder="Search ingredients..."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </div>
                    {searchTerm && (
                        <div className="searchResults">
                            {filteredIngredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="searchResult"
                                    onClick={() => handleAddSelectedIngredient(ingredient)}
                                >
                                    {ingredient}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {selectedIngredients.length > 0 && (
                    <div>
                        <div className="selected-ingredients-section">
                            <h2>Selected ingredients:</h2>
                            <div className="selected-ingredient-list">
                                {selectedIngredients.map((ingredient, index) => (
                                    <div key={index} className="selected-ingredient">
                                        {ingredient}
                                        <button onClick={() => handleRemoveSelectedIngredient(ingredient)}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                            <img src={isHovered ? removeHoveredIcon : removeIcon} />
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                )}
            </div>
        </div>
    );
}

export default SearchByIngredients;