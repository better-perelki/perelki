import React, { useState, useEffect } from 'react';
import '../styles/AllRecipes.css';
import alphabet from '../data/Alphabet.json';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';

const AllRecipes = () => {
    const [drinksByLetter, setDrinksByLetter] = useState({});
    const [showNonAlcoholic, setShowNonAlcoholic] = useState(false);

    const fetchDrinksByLetter = async (letter) => {
        try {
            let apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
            
            if (showNonAlcoholic) {
                apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
            }
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            let sortedDrinks = data.drinks || [];
            if (showNonAlcoholic) {
                sortedDrinks.sort((a, b) => {
                    return a.strDrink.localeCompare(b.strDrink);
                });
            }

            setDrinksByLetter((prevDrinks) => ({
                ...prevDrinks,
                [letter]: sortedDrinks
            }));
        } catch (error) {
            console.error(`Error fetching drinks for letter ${letter}:`, error);
            setDrinksByLetter((prevDrinks) => ({
                ...prevDrinks,
                [letter]: []
            }));
        }
    };

    useEffect(() => {
        alphabet.letters.forEach((letterObject) => {
            const letter = letterObject.letter;
            fetchDrinksByLetter(letter);
        });
    }, [showNonAlcoholic]);

    const handleLetterClick = (letter) => {
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleNonAlcoholic = () => {
        setShowNonAlcoholic(!showNonAlcoholic);
    };

    return (
        <div className={`AllRecipes ${showNonAlcoholic ? 'non-alcoholic-mode' : ''}`}>
            <div className='content'>
                <h2>BOTTOMS UP!!!</h2>
                <h1>{showNonAlcoholic ? "Well, at least you're avoiding hangover..." : "Well, fill your glass first..."}</h1>
            </div>

            <div className="alphabet-bar">
                {alphabet.letters.map((letterObject) => (
                    <span
                        key={letterObject.id}
                        className="alphabet-link"
                        onClick={() => handleLetterClick(letterObject.letter)}
                    >
                        {letterObject.letter}
                    </span>
                ))}
            </div>

            <div className="content">
                <button
                    className="filter-button"
                    onClick={() => toggleNonAlcoholic()}
                >
                    {showNonAlcoholic ? 'Show All' : 'Non-alcoholic mode'}
                </button>
            </div>

            {alphabet.letters.map((letterObject) => {
                const letter = letterObject.letter;
                const drinks = drinksByLetter[letter] || [];
                const filteredDrinks = drinks.filter(drink => {
                    const drinkName = drink.strDrink.toLowerCase();
                    return !showNonAlcoholic || drinkName.startsWith(letter.toLowerCase());
                });

                if (filteredDrinks.length > 0) {
                    return (
                        <div className="show-alphabet" key={letterObject.id} id={letter}>
                            <div className='drinks'>
                                <div className='content'>
                                    <div className='letters'>
                                        <h3>{letter}</h3>
                                    </div>
                                    <div className='drinksList'>
                                        {filteredDrinks.map(drink => (
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
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default AllRecipes;
