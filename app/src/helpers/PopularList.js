import React, { useEffect, useState } from 'react';
import Drink from '../components/Drink';
import GetIngredients from './GetIngredients';

function PopularList() {
    //storing drinks data
    const [popularDrinks, setPopularDrinks] = useState([]);

    useEffect(() => {
        //fetch drinks data from the api
        const fetchPopularDrinks = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
                if (!response.ok) {
                    throw new Error('Failed to fetch popular drinks');
                }
                const data = await response.json();
                setPopularDrinks(data.drinks);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        fetchPopularDrinks();
    }, []);

    return (
        <div className='drinksList'>
            {popularDrinks.map(drink => (
                <Drink
                    key={drink.idDrink}
                    image={drink.strDrinkThumb}
                    name={drink.strDrink}
                    ingredients={GetIngredients(drink)}
                />
            ))}
        </div>
    );
}

export default PopularList;