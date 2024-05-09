import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchByIngredients.css'; // Zaimportuj plik CSS dla styli

function SearchByIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [foundCocktails, setFoundCocktails] = useState([]);
    

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                setIngredients(data.drinks.map(drink => drink.strIngredient1)); // Zapisujemy tylko nazwy składników
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const handleAddIngredient = (event) => {
        const ingredient = event.target.value;
        // Sprawdź, czy wybrany składnik nie jest pusty
        if (ingredient.trim() !== '') {
            // Sprawdź, czy wybrany składnik nie został już dodany
            if (!selectedIngredients.includes(ingredient)) {
                // Dodaj nowy składnik do listy wybranych składników
                setSelectedIngredients([...selectedIngredients, ingredient]);
            } else {
                alert('This component has already been added.');
            }
        }
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...selectedIngredients];
        newIngredients.splice(index, 1);
        setSelectedIngredients(newIngredients);
    };
    

    const handleSearch = async () => {
        try {
            if (selectedIngredients.length === 0) {
                alert('Select at least one ingredient before searching.');
                return;
            }
    
            const ingredientsQueryFormatted = selectedIngredients.map(ingredient => ingredient.replace(/\s/g, '_')).join(',');
    
            // Wyślij zapytanie do API
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
        <div>
            <div className="search-by-ingredients-container">
                <div className="ingredients-section">
                    <h2>Choose ingredients:</h2>
                    <select onChange={handleAddIngredient}>
                        <option value="">Choose ingredients...</option>
                        {ingredients.map((ingredient, index) => (
                            <option key={index} value={ingredient}>{ingredient}</option>
                        ))}
                    </select>
                    <div>
                        {selectedIngredients.map((ingredient, index) => (
                            <div key={index}>
                                {ingredient}
                                <button onClick={() => handleRemoveIngredient(index)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
    
            <div className="cocktails-section">
                {Array.isArray(foundCocktails) && foundCocktails.length > 0 && (
                    <div>
                        <h2>Found drinks:</h2>
                        <div className="cocktails-container">
                            {foundCocktails.map(cocktail => (
                                <Link to={`/recipe/${cocktail.idDrink}`} key={cocktail.idDrink} className="cocktail-link">
                                    <div className="cocktail">
                                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                                        <h3>{cocktail.strDrink}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
    
    



}

export default SearchByIngredients;
