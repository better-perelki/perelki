import React, { useState, useEffect } from 'react';
import '../styles/SearchByIngredients.css';
import Drink from '../components/Drink';
import Ingredient from '../components/Ingredient';
import { addSelectedIngredient, removeSelectedIngredient, searchCocktails } from '../helpers/IngredientUtils';
import searchIcon from '../assets/search.png';
import removeHoveredIcon from '../assets/remove.png';
import removeIcon from '../assets/remove1.png';
import useHover from '../helpers/useHover';
import IconRandom from '../components/IconRandom';

function SearchByIngredients() {
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [foundCocktails, setFoundCocktails] = useState([]);
    const [showRandomIcon, setShowRandomIcon] = useState(false);
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list');
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRandomIcon(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleSearchTermChange = (e) => setSearchTerm(e.target.value.toLowerCase());

    useEffect(() => {
        searchCocktails(selectedIngredients, setFoundCocktails);
    }, [selectedIngredients]);

    return (
        <div className="search-by-ingredients-container">
            <div className="ingredients-section">
                <div className='search'>
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
                </div>
                {searchTerm && (
                    <div className="searchResults">
                        {ingredientsList.filter(ingredient => ingredient.split(' ').some(word => word.startsWith(searchTerm))).map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                ingredient={ingredient}
                                onClick={() => addSelectedIngredient(ingredient, selectedIngredients, setSelectedIngredients)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {selectedIngredients.length === 0 && (
                <div className='content'>
                    <div className="no-ingredients-message">
                        <p>Add some ingredients, you can't make a drink out of nothing!</p>
                    </div>
                </div>
            )}
            {selectedIngredients.length > 0 && (
                <div>
                    <div className="selected-ingredients-section">
                        <h2>Selected ingredients:</h2>
                        <div className="selected-ingredient-list">
                            {selectedIngredients.map((ingredient, index) => (
                                <div key={index} className="selected-ingredient">
                                    {ingredient}
                                    <button onClick={() => removeSelectedIngredient(ingredient, selectedIngredients, setSelectedIngredients)}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}>
                                        <img src={isHovered ? removeHoveredIcon : removeIcon} alt="Remove Icon" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="drinks">
                        <div className='content'>
                            {Array.isArray(foundCocktails) && foundCocktails.length > 0 ? (
                                <div className='content'>
                                    <h2>Found drinks:</h2>
                                    <div className='drinksList'>
                                        {foundCocktails.map(drink => (
                                            <Drink
                                                key={drink.idDrink}
                                                id={drink.idDrink}
                                                image={drink.strDrinkThumb}
                                                name={drink.strDrink}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-drinks-message">
                                    <p>No matching drinks found :(</p>
                                    <p>Try different ingredients</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showRandomIcon && <IconRandom />}
        </div>
    );
}

export default SearchByIngredients;
