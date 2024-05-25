import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllRecipes.css';
import alphabetData from '../data/Alphabet.json';
import nonAlcoholicDrinksData from '../data/NonAlcoholicDrinks.json';
import AlphabetBar from '../components/AlphabetBar';
import AllDrinksList from '../components/AllDrinksList';
import CustomAlert from '../components/CustomAlert';
import IconRandom from '../components/IconRandom';

const AllRecipes = () => {
    const [drinksByLetter, setDrinksByLetter] = useState({});
    const [nonAlcoholicDrinks, setNonAlcoholicDrinks] = useState([]);
    const [showNonAlcoholic, setShowNonAlcoholic] = useState(() => localStorage.getItem('showNonAlcoholic') ? JSON.parse(localStorage.getItem('showNonAlcoholic')) : false);
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
            setNonAlcoholicDrinks(nonAlcoholicDrinksData.drinks || []);
        } catch (error) {
            console.error('Error fetching non-alcoholic drinks:', error);
            setNonAlcoholicDrinks([]);
        }
    };

    useEffect(() => {
        alphabetData.letters.forEach((letterObject) => {
            fetchDrinksByLetter(letterObject.letter);
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

            <AlphabetBar letters={alphabetData.letters} onLetterClick={handleLetterClick} />

            <div className="button-container">
                <button
                    className="filter-button"
                    onClick={toggleNonAlcoholic}
                >
                    {showNonAlcoholic ? 'Alcoholic Mode' : 'Non-alcoholic mode'}
                </button>
            </div>

            {alphabetData.letters.map(letterObject => {
                const letter = letterObject.letter;
                const drinks = showNonAlcoholic
                    ? nonAlcoholicDrinks.filter(drink => drink.strDrink.toLowerCase().startsWith(letter.toLowerCase()))
                    : drinksByLetter[letter] || [];

                return drinks.length > 0 ? (
                    <AllDrinksList key={letterObject.id} letter={letter} drinks={drinks} />
                ) : null;
            })}

            {showAlert && <CustomAlert message={alertMessage} onClose={handleCloseAlert} />}
            {showRandomIcon && <IconRandom />}
        </div>
    );
};

export default AllRecipes;