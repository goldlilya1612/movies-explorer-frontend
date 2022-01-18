import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { LOGIN } from '../../utils/constants';
import React, { useCallback, useState } from "react";
import "./Login.css";


function Login({onLogin, isDisabled}) {

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({
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
        onLogin(data, setData, setIsValid, setErrors, resetForm);

        //TODO: resetForm in onLogin;
        //resetForm();
    }

    const resetForm = useCallback(
        (newData = {
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
                <h1 className="section-with-form__title">Рады видеть!</h1>
            </div>
            <form onSubmit={handleSubmit} className="section-with-form__form">
                <label className="section-with-form__label" htmlFor="email-login">E-mail
                    {
                        isDisabled ?
                        (<input disabled onChange={handleChange} required value={data.email} type="email" name="email" id="email-login" className="section-with-form__input"></input>):
                        (<input onChange={handleChange} required value={data.email} type="email" name="email" id="email-login" className="section-with-form__input"></input>)
                    }
                    <span className="section-with-form__error">{errors.email}</span>
                </label>
                <label className="section-with-form__label" htmlFor="password-login">Пароль
                    {
                        isDisabled ?
                        (<input disabled onChange={handleChange} required value={data.password} type="password" name="password" id="password-login" className="section-with-form__input" minLength='8'></input>):
                        (<input onChange={handleChange} required value={data.password} type="password" name="password" id="password-login" className="section-with-form__input" minLength='8'></input>)
                    }
                    <span className="section-with-form__error">{errors.password}</span>
                </label>
                <ButtonBlock content = { LOGIN } name='login' isValid={isValid} isDisabled={isDisabled}/>
            </form>
        </section>
    );
}

export default Login;