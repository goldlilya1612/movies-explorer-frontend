import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Logo.css";


function Logo() {
    return (
        <Link to="/" className="logo-link">
            <img className="logo-link__image" alt="Логотип" src={logo}></img>
        </Link>
    );
}

export default Logo;