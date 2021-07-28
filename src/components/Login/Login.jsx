import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { LOGIN } from '../../utils/constants';
import "./Login.css";


function Login() {
    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Рады видеть!</h1>
            </div>
            <form className="section-with-form__form">
                <label className="section-with-form__label" htmlFor="email-login">E-mail
                    <input required type="email" id="email-login" className="section-with-form__input"></input>
                </label>
                <label className="section-with-form__label" htmlFor="password-login">Пароль
                    <input required type="password" id="password-login" className="section-with-form__input"></input>
                    <span className="section-with-form__error">Что-то пошло не так...</span>
                </label>
                <ButtonBlock content = { LOGIN } name='login'/>
            </form>
        </section>
    );
}

export default Login;