import React from 'react';

const Ingredient = ({ ingredient, onClick }) => {
    return (
        <div className="searchResult" onClick={onClick}>
            {ingredient}
        </div>
    );
};

export default Ingredient;