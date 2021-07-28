import React from 'react';
import successfulAuth from '../images/successful_auth.svg';
import unsuccessfulAuth from '../images/unsuccessful_auth.svg'

function InfoTooltip(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button type="button" className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
                <img className="popup__picture" src={props.auth ? successfulAuth : unsuccessfulAuth}></img>
                <p className="popup__text">{props.auth ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div>
    )      
}

export default InfoTooltip; 