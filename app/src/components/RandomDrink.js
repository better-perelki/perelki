import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RandomDrinkGif from '../assets/RandomDrink.gif';
import '../styles/RandomDrink.css';

const RandomDrink = () => {
    const [randomDrink, setRandomDrink] = useState(null);
    const navigate = useNavigate(); 

    const handleRandomDrinkClick = async () => {
        try {
    
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await response.json();

            if (data && data.drinks && data.drinks.length > 0) {
                const { idDrink } = data.drinks[0];
                setRandomDrink(idDrink);

          
                navigate(`/recipe/${idDrink}`);
            }
        } catch (error) {
            console.error('Error fetching random drink:', error);
        }
    };

    return (
        <div className='RandomDrink' onClick={handleRandomDrinkClick} style={{ cursor: 'pointer' }}>
            <h1>Try our random recipe!</h1>
            <img src={RandomDrinkGif} className='RandomDrinkGif' alt='RandomDrink' />
        </div>
    );
};

export default RandomDrink;