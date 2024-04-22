import React, { useEffect, useState } from 'react'
import Drink from '../components/Drink'
import GetIngredients from './GetIngredients';

function PopularList() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
            .then(response => response.json())
            .then(data => setPopular(data.drinks))
            .catch(error => console.error('error fetching drinks:', error));
    }, []);

    return (
        <div className='drinksList'>
            {popular && popular.map(drink => (
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
