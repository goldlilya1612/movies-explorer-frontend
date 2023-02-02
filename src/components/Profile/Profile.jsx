import "./Profile.css";
import React, { useState } from "react";
import {CurrentUserContext} from '../../contexts/currentUserContext';
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";


function Profile({onUpdateUser, onLogout, loggedIn, isPreloaderVisible, isDisabled}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
    });

    React.useEffect(() => {
        setData({
            name: currentUser.name,
            email: currentUser.email,
        })
    }, [currentUser]);

    const handleChange = (e) => {
        const target = e.target;
        const {name, value} = target;
        setData({...data, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(data);
    }

    return (
        <> 
            <Preloader isPreloaderVisible={isPreloaderVisible}/>
            <Header loggedIn={loggedIn}/>
            <section className="profile">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form onSubmit={handleSubmit} className="profile-form">
                    <label className="profile-form__label profile-form__label_first " htmlFor="profile-name">Имя
                        {isDisabled ? 
                            (<input disabled onChange ={handleChange} type="text" name="name" id="profile-name" className="profile-form__input" value={data.name} minLength="2" maxLength="30"></input>) : 
                            (<input onChange ={handleChange} type="text" name="name" id="profile-name" className="profile-form__input" value={data.name} minLength="2" maxLength="30"></input>)
                        }
                    </label>
                    <span className="profile__input-error">{errors.name}</span>

                    <label className="profile-form__label" htmlFor="profile-email">E-mail
                        {isDisabled ? 
                            (<input disabled onChange ={handleChange} type="email" name="email" id="profile-email" className="profile-form__input" value={data.email}></input>):
                            (<input onChange ={handleChange} type="email" name="email" id="profile-email" className="profile-form__input" value={data.email}></input>)
                        }
                    </label>
                    <span className="profile__input-error">{errors.email}</span>
                    
                    <div className="profile__buttons">
                        {isValid ?
                            isDisabled ?
                                (<button disabled type="submit" className="profile__button profile__button_update">Редактировать</button>):
                                (<button type="submit" className="profile__button profile__button_update">Редактировать</button>): 
                            (<button type="submit" className="profile__button profile__button_invalid profile__button_update" disabled>Редактировать</button>)
                        }
                        <button onClick={onLogout} type="button" className="profile__button profile__button_get-out">Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Profile;