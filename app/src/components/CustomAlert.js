import React from 'react';
import '../styles/CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <p>{message}</p>   
        </div>
    );
};

export default CustomAlert;