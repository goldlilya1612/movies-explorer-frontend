import React from 'react';
import "./ErrPopup.css";

function ErrPopup({isOpen, onClose, errorMessage}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}>
                <button type="button" className={`popup__close-button`} onClick={onClose}></button>
                <p className="popup__text">{errorMessage}</p>
            </div>
        </div>
    )      
}

export default ErrPopup; 