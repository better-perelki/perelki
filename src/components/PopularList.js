import { useEffect, useState } from 'react';
import RenderDrinks from '../helpers/RenderDrinks';

function PopularList() {
    const [popularDrinks, setPopularDrinks] = useState([]);

    useEffect(() => {
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
        RenderDrinks(popularDrinks)
    );
}

export default PopularList;
