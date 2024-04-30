import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/RecipeDetails.css'; // Importowanie styli CSS

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                if (data.drinks && data.drinks.length > 0) {
                    setRecipeDetails(data.drinks[0]);
                } else {
                    console.error('Recipe details not found.');
                }
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    const getIngredientsList = (recipeDetails) => {
        const ingredients = [];
        // Loop through up to 15 ingredients
        for (let i = 1; i <= 15; i++) {
            const ingredient = recipeDetails[`strIngredient${i}`];
            const measure = recipeDetails[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
            } else if (ingredient) {
                ingredients.push(ingredient.trim());
            }
        }
        return ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>);
    };


     // In progress...
    return (
        <div className="recipe-details-container">
            {recipeDetails ? (
                <div className="recipe-details">
                    <div className="recipe-image-container">
                        <img src={recipeDetails.strDrinkThumb} alt={recipeDetails.strDrink} />
                    </div>
                    <h2>{recipeDetails.strName}</h2>
                </div>
            ) : (
                <p>Loading recipe details...</p>
            )}
        </div>
    );
};

export default RecipeDetails;
