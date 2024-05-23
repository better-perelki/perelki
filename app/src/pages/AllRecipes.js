import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllRecipes.css';
import alphabet from '../data/Alphabet.json';
import nonAlcoholicDrinksData from '../data/NonAlcoholicDrinks.json';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';
import CustomAlert from '../components/CustomAlert';
import IconRandom from '../components/IconRandom';

const AllRecipes = () => {
    const [drinksByLetter, setDrinksByLetter] = useState({});
    const [nonAlcoholicDrinks, setNonAlcoholicDrinks] = useState([]);
    const [showNonAlcoholic, setShowNonAlcoholic] = useState(() => {
        const savedState = localStorage.getItem('showNonAlcoholic');
        return savedState ? JSON.parse(savedState) : false;
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showRandomIcon, setShowRandomIcon] = useState(false);

    const fetchData = async (url, key) => {
        try {
            const cachedData = localStorage.getItem(key);
            if (cachedData) {
                return JSON.parse(cachedData);
            } else {
                const response = await fetch(url);
                const data = await response.json();
                localStorage.setItem(key, JSON.stringify(data));
                return data;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const fetchDrinksByLetter = async (letter) => {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
        const key = `drinksByLetter_${letter}`;
        const data = await fetchData(apiUrl, key);
        if (data) {
            setDrinksByLetter((prevDrinks) => ({
                ...prevDrinks,
                [letter]: data.drinks || []
            }));
        }
    };

    const fetchNonAlcoholicDrinks = async () => {
        try {
            const data = nonAlcoholicDrinksData;
            setNonAlcoholicDrinks(data.drinks || []);
        } catch (error) {
            console.error('Error fetching non-alcoholic drinks:', error);
            setNonAlcoholicDrinks([]);
        }
    };

    useEffect(() => {
        alphabet.letters.forEach((letterObject) => {
            const letter = letterObject.letter;
            fetchDrinksByLetter(letter);
        });

        fetchNonAlcoholicDrinks();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRandomIcon(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('showNonAlcoholic', JSON.stringify(showNonAlcoholic));
    }, [showNonAlcoholic]);

    const handleLetterClick = (letter) => {
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            setShowAlert(true);
            setAlertMessage('No drinks found for this letter.');
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 2000);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const toggleNonAlcoholic = () => {
        setShowNonAlcoholic((prevState) => !prevState);
    };

    return (
        <div className={`AllRecipes ${showNonAlcoholic ? 'non-alcoholic-mode' : ''}`}>
            <div className='content'>
                <div className='text-container'>
                    <h2>BOTTOMS UP!!!</h2>
                    <h3>{showNonAlcoholic ? "Well, at least you're avoiding hangover..." : "Well, fill your glass first..."}</h3>
                </div>
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

            <div className="button-container">
                <button
                    className="filter-button"
                    onClick={toggleNonAlcoholic}
                >
                    {showNonAlcoholic ? 'Alcoholic Mode' : 'Non-alcoholic mode'}
                </button>
            </div>

            {alphabet.letters.map((letterObject) => {
                const letter = letterObject.letter;
                const drinks = showNonAlcoholic
                    ? nonAlcoholicDrinks.filter(drink => drink.strDrink.toLowerCase().startsWith(letter.toLowerCase()))
                    : drinksByLetter[letter] || [];

                if (drinks.length > 0) {
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
                } else {
                    return null;
                }
            })}

            {showAlert && <CustomAlert message={alertMessage} onClose={handleCloseAlert} />}
            {showRandomIcon && <IconRandom />}
        </div>
    );
};

export default AllRecipes;
