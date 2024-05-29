import React from 'react';
import { Link } from 'react-router-dom';

const Drink = ({ id, image, name, ingredients }) => {

    return (
        <div className="drink">
            <Link to={`/recipe/${id}`}>
                <img src={image} alt={name} />
                <div className='info'>
                    <h3>{name}</h3>
                    <p>{ingredients}</p>
                </div>
            </Link>
        </div>
    );
};

export default Drink;
