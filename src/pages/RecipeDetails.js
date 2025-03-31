import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import arrow from '../assets/chevron-down-2.png';
import arrowBold from '../assets/arrow_bold.png';
import useHover from '../helpers/useHover';
import LoadIcon from '../assets/Loading.gif';
import CustomModal from '../helpers/CustomModal';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

    useEffect(() => {
        if(id === "99999"){
            setRecipeDetails({
                idDrink: "99999", 
                strDrink: "Denatured Cocktail", 
                strDrinkThumb: "https://i.ibb.co/jPLSM7rH/Projekt-bez-nazwy.png", 
                strInstructions: "Pour 150ml denatured alcohol into a glass, add 50ml solvent and garnish with mint leaves.",
                ingredients: ["Denatured Alcohol", "Solvent", "Mint leaves"], 
            });


             const timer = setTimeout(() => {
                setShowModal(true);
                setRecipeDetails({ idDrink: "99999", 
                strDrink: "Denatured Cocktail", 
                strDrinkThumb: "https://i.ibb.co/jPLSM7rH/Projekt-bez-nazwy.png", 
                strInstructions: "Such a drink doesn't exist. There's no recipe for it. Try searching for another one.",
                ingredients: ["Denatured Alcohol", "Solvent", "Mint leaves"], });
            }, 5000);


  
            return () => clearTimeout(timer);
        }
        else{const fetchRecipeDetails = async () => {
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
    }
    }, [id]);

    const formatIngredients = (recipeDetails) => {

        if (id === "99999") {
            return recipeDetails.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>);
        }

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
    
    const handleCloseModal = () => {
        setShowModal(false); 
    };

    return (
        <div className="recipe-details-container">
            <div className='button'
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
                        <div className='ingredients'>
                            <h3>Ingredients:</h3>
                            <ul>{formatIngredients(recipeDetails)}</ul>
                        </div>
                        <div className='instructions'>
                            <h3>Instructions:</h3>
                            <p>{recipeDetails.strInstructions}</p>
                        </div>
                    </div>
                    <div className="recipe-image-container">
                        <img src={recipeDetails.strDrinkThumb} alt={recipeDetails.strDrink} />
                    </div>
                </div>
            ) : (
                <img src={LoadIcon} className='LoadIcon' alt='LoadIcon' />
            )}
            {showModal && (
                <CustomModal
                    message="April Fools! Don't drink it! Dont't even try to make that drink!"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default RecipeDetails;