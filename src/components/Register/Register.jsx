import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { REGISTER }from '../../utils/constants';
import "./Register.css";


function Register() {
    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Добро пожаловать!</h1>
            </div>
            <form className="section-with-form__form section-with-form__form_register">
                <label className="section-with-form__label" htmlFor="name-register">Имя
                    <input required type="text" id="name-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error">Что-то пошло не так...</span>
                </label>
                <label className="section-with-form__label" htmlFor="email-register">E-mail
                    <input required type="email" id="email-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error"></span>
                </label>
                <label className="section-with-form__label" htmlFor="password-register">Пароль
                    <input required type="password" id="password-register" className="section-with-form__input"></input>
                    <span className="section-with-form__error">Что-то пошло не так...</span>
                </label>
            </form>
            <ButtonBlock content = { REGISTER }/>
        </section>
    );
}

export default Register;