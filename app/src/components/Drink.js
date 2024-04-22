import React from 'react'
import '../styles/Drink.css'

function Drink({ image, name, ingredients }) {
    return (
        <div className='drink'>
            <img src={image} alt={name} />
            <div className='info'>
                <h3>{name}</h3>
                <p>{ingredients}</p>
            </div>
        </div>
    )
}

export default Drink