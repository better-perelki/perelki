import { useState, useEffect } from 'react';

const NameSearcher = () => {
    const [searchTerm, setSearchTerm] = useState(''); //store search term
    const [searchResults, setSearchResults] = useState([]); //store search results

    //fetch results from api and update them based on the fetched data 
    useEffect(() => {
        const fetchSearchResults = async () => {
            //if the term is empty, clear the results
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            try {
                //fetiching results from the api
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                const data = await response.json();

                //filter the results
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

        //call the function when the search term changes
        fetchSearchResults();
    }, [searchTerm]);

    //update the search term when the input changes
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return { searchTerm, searchResults, handleInputChange };
};

export default NameSearcher;