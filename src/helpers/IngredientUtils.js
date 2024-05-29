export const addSelectedIngredient = (ingredient, selectedIngredients, setSelectedIngredients) => {
    if (!selectedIngredients.includes(ingredient)) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
    }
};

export const removeSelectedIngredient = (ingredient, selectedIngredients, setSelectedIngredients) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
};

export const searchCocktails = async (selectedIngredients, setFoundCocktails) => {
    try {
        const ingredientsQueryFormatted = selectedIngredients.map(ingredient => ingredient.replace(/\s/g, '_')).join(',');
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredientsQueryFormatted}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cocktails');
        }
        const data = await response.json();
        setFoundCocktails(data.drinks);
    } catch (error) {
        console.error('Error searching cocktails:', error);
        alert('An error occurred while searching for drinks. Please try again later.');
    }
};
