import React from 'react';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';
import '../styles/AllDrinksList.css';

const AllDrinksList = ({ letter, drinks }) => (
    <div className="show-alphabet" id={letter}>
        <div className='drinks'>
            <div className='content'>
                <div className='letters'>
                    <h2>{letter}</h2>
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

export default AllDrinksList;
