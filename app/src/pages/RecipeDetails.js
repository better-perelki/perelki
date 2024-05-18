import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import arrow from '../assets/chevron-down-2.png';
import arrowBold from '../assets/arrow_bold.png';
import useHover from '../helpers/useHover';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const navigate = useNavigate();
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

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

    const formatIngredients = (recipeDetails) => {
        const ingredientsList = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = recipeDetails[`strIngredient${i}`];
            const measure = recipeDetails[`strMeasure${i}`];
            if (ingredient) {
                const formattedIngredient = measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
                ingredientsList.push(formattedIngredient);
            }
        }
        return ingredientsList.map((ingredient, index) => <li key={index}>{ingredient}</li>);
    };

    const handleBackNavigation = () => {
        navigate(-1);
    }

    return (
        <div className="recipe-details-container">
            <div className='back-button'
                onClick={handleBackNavigation}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={isHovered ? arrowBold : arrow} alt='Back' />
            </div>
            {recipeDetails ? (
                <div className="recipe-details">
                    <div className="recipe-details-content">
                        <h2>{recipeDetails.strDrink}</h2>
                        <h3>Ingredients:</h3>
                        <ul>{formatIngredients(recipeDetails)}</ul>
                        <h3>Instructions:</h3>
                        <p>{recipeDetails.strInstructions}</p>
                    </div>
                    <div className="recipe-image-container">
                        <img src={recipeDetails.strDrinkThumb} alt={recipeDetails.strDrink} />
                    </div>
                </div>
            ) : (
                <p>Loading recipe details...</p>
            )}
        </div>
    );
};

export default RecipeDetails;