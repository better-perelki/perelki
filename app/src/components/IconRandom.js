import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkIcon from '../assets/DrinkIcon.png';
import removeIcon from '../assets/x_yellow.png'; // Importujemy ikonę X
import '../styles/IconRandom.css';

const IconRandom = () => {
    const [showIcon, setShowIcon] = useState(true);
    const navigate = useNavigate(); 

    const handleRandomDrinkClick = async () => {
        try {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await response.json();

            if (data && data.drinks && data.drinks.length > 0) {
                const { idDrink } = data.drinks[0];
                navigate(`/recipe/${idDrink}`);
            }
        } catch (error) {
            console.error('Error fetching random drink:', error);
        }
    };

    const handleCloseClick = (e) => {
        e.stopPropagation(); 
        setShowIcon(false); 
    };

    return (
        <>
            {showIcon && (
                <div className='IconRandom' onClick={handleRandomDrinkClick}>
                    <img src={DrinkIcon} className='RandomDrinkIcon' alt='IconRandom' />
                    <div className="CloseButton" onClick={handleCloseClick}>
                        <img src={removeIcon} alt="Remove" />
                    </div>
                </div>
            )}
        </>
    );
};

export default IconRandom;
