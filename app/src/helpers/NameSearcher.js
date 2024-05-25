import { useState, useEffect } from 'react';

const NameSearcher = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                const data = await response.json();

                const filteredResults = data.drinks ? data.drinks.filter(drink => {
                    const lowerCaseName = drink.strDrink.toLowerCase();
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    return lowerCaseName.startsWith(lowerCaseSearchTerm) || lowerCaseName.includes(` ${lowerCaseSearchTerm}`);
                }) : [];

                setSearchResults(filteredResults);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return { searchTerm, searchResults, handleInputChange };
};

export default NameSearcher;