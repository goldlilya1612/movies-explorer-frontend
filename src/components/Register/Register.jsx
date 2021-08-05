import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { REGISTER } from '../../utils/constants';
import React, { useCallback, useState } from "react";
import "./Register.css";


function Register({ onRegister }) {
    
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const target = e.target;
        const {name, value} = target;
        setData({...data, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(data);

        //TODO: resetForm in onRegister;
        resetForm();
    }

    const resetForm = useCallback(
        (newData = {
            name: '',
            email: '',
            password: '',
        }, newErrors = {}, newIsValid = false) => {
          setData(newData);
          setErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setData, setErrors, setIsValid]
    );

    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Добро пожаловать!</h1>
            </div>
            <form onSubmit={handleSubmit} className="section-with-form__form">
                <label className="section-with-form__label" htmlFor="name-register">Имя
                    <input required onChange={handleChange} value={data.name} type="text" name="name" id="name-register" className="section-with-form__input" minLength='2' maxLength='30'></input>
                    <span className="section-with-form__error">{errors.name}</span>
                </label>
                <label className="section-with-form__label" htmlFor="email-register">E-mail
                    <input required onChange={handleChange} value={data.email} type="email" name="email" id="email-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error">{errors.email}</span>
                </label>
                <label className="section-with-form__label" htmlFor="password-register">Пароль
                    <input required onChange={handleChange} value={data.password} type="password" name="password" id="password-register" className="section-with-form__input" minLength='8'></input>
                    <span className="section-with-form__error">{errors.password}</span>
                </label>
                <ButtonBlock content = { REGISTER } name='register' isValid={isValid}/>
            </form>
        </section>
    )
        
    
}

export default Register;