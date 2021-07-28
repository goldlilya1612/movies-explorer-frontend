import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { REGISTER }from '../../utils/constants';
import { useState } from "react";
import "./Register.css";


function Register({ onRegister }) {
    
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(data);
    }

    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Добро пожаловать!</h1>
            </div>
            <form onSubmit={handleSubmit} className="section-with-form__form">
                <label className="section-with-form__label" htmlFor="name-register">Имя
                    <input required onChange={handleChange} value={data.name} type="text" name="name" id="name-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error">Что-то пошло не так...</span>
                </label>
                <label className="section-with-form__label" htmlFor="email-register">E-mail
                    <input required onChange={handleChange} value={data.email} type="email" name="email" id="email-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error"></span>
                </label>
                <label className="section-with-form__label" htmlFor="password-register">Пароль
                    <input required onChange={handleChange} value={data.password} type="password" name="password" id="password-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error">Что-то пошло не так...</span>
                </label>
                <ButtonBlock content = { REGISTER } name='register'/>
            </form>
        </section>
    );
}

export default Register;