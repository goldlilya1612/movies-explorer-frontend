import "./NavigationUnauthorized.css";
import { Link } from 'react-router-dom';

const NavigationUnauthorized = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__links">
                <li className="navigation__link-item">
                    <Link to="/signup" className="navigation__link navigation__link_unauthorized navigation__link_registration">
                        Регистрация
                    </Link>
                </li>
                <li className="navigation__link-item">
                    <Link to="/signin" className="navigation__link navigation__link_unauthorized">
                        <button className="navigation__login-button">Войти</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationUnauthorized;