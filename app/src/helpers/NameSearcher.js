import React, { useState, useEffect } from 'react'

function NameSearcher() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => setSearchResults(data.drinks || []))
            .catch(error => console.error('Error fetching drinks:', error));
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return { searchTerm, searchResults, handleInputChange }
}

export default NameSearcher;
