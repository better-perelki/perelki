import React from 'react';

const AlphabetBar = ({ letters, onLetterClick }) => (
    <div className="alphabet-bar">
        {letters.map(letterObject => (
            <span
                key={letterObject.id}
                className="alphabet-link"
                onClick={() => onLetterClick(letterObject.letter)}
            >
                {letterObject.letter}
            </span>
        ))}
    </div>
);

export default AlphabetBar;
