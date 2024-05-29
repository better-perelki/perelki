import React from 'react';
import Drink from '../components/Drink';
import GetIngredients from '../helpers/GetIngredients';

const AllDrinksList = ({ letter, drinks }) => (
    <div className="show-alphabet" id={letter}>
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

export default AllDrinksList;
