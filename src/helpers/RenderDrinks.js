// src/helpers/RenderDrinks.js
import React from 'react';
import Drink from '../components/Drink';
import GetIngredients from './GetIngredients';

const RenderDrinks = (drinks) => {
    return (
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
    );
};

export default RenderDrinks;
