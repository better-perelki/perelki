import React from 'react';
import { Link } from 'react-router-dom';

const Drink = ({ id, image, name }) => {

    return (
        <div className="drink">
            <Link to={`/recipe/${id}`}>
                <img src={image} alt={name} />
                <p>{name}</p>
            </Link>
        </div>
    );
};

export default Drink;
