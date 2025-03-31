import React from 'react';
import '../styles/CustomModal.css'; 

const CustomModal = ({ message, onClose }) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomModal;