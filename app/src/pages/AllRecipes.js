import React, { useState, useEffect } from 'react';
import '../styles/AllRecipes.css';
import alphabet from '../data/Alphabet.json';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';

const AllRecipes = () => {
    const [drinksByLetter, setDrinksByLetter] = useState({});

    useEffect(() => {
        const fetchDrinksByLetter = async (letter) => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
                const data = await response.json();
                setDrinksByLetter((prevDrinks) => ({
                    ...prevDrinks,
                    [letter]: data.drinks || []
                }));
            } catch (error) {
                console.error(`Error fetching drinks for letter ${letter}:`, error);
                setDrinksByLetter((prevDrinks) => ({
                    ...prevDrinks,
                    [letter]: []
                }));
            }
        };

        alphabet.letters.forEach((letterObject) => {
            const letter = letterObject.letter;
            fetchDrinksByLetter(letter);
        });
    }, []);

    const handleLetterClick = (letter) => {
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="AllRecipes">
            <div className='content'>
                <h2>BOTTOMS UP!!!</h2>
                <h3>Well, fill your glass first...</h3>
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

            {alphabet.letters.map((letterObject) => {
                const letter = letterObject.letter;
                const drinks = drinksByLetter[letter] || [];

                return (
                    <div className="show-alphabet" key={letterObject.id} id={letter}>
                        <div className='drinks'>
                            <div className='content'>
                                <div className='letters'>
                                    <h3>{letter}</h3>
                                </div>
                                <div className='drinksList'>
                                    {drinks.map(drink => (
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
            })}
        </div>
    );
};

export default AllRecipes;
