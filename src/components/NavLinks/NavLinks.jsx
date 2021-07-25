import { NavLink } from "react-router-dom";
import "./NavLinks.css";

function NavLinks({isMobile}) {

    return (
        <ul className="navigation__links navigation__links_authorized">
            {isMobile ? 
            (<li className="navigation__link-item navigation__link-item_authorized">
                <NavLink exact to="/" className="navigation__link navigation__link_authorized" activeClassName="navigation__link_active">
                    Главная
                </NavLink>
            </li>) : ('')}
            <li className="navigation__link-item navigation__link-item_authorized">
                <NavLink to="/movies" className="navigation__link navigation__link_authorized" activeClassName="navigation__link_active">
                    Фильмы
                </NavLink>
            </li>
            <li className="navigation__link-item navigation__link-item_authorized">
                <NavLink to="/saved-movies" className="navigation__link navigation__link_authorized" activeClassName="navigation__link_active">
                    Сохраненные фильмы
                </NavLink>
            </li>
            <li className="navigation__link-item navigation__link-item_authorized navigation__link-item_account">
                <NavLink to="/profile" className="navigation__link">
                    <button className="navigation__profile-button">Аккаунт</button>
                    <div className="profile-button__icon"></div>
                </NavLink>
            </li>
        </ul>
    );

}

export default NavLinks;