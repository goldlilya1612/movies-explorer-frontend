import "./Header.css";
import NavigationUnauthorized from '../NavigationUnauthorized/NavigationUnauthorized';
import NavigationAuthorized from '../NavigationAuthorized/NavigationAuthorized';
import Logo from "../Logo/Logo";

const isAuthorized = false;

const Header = () => {
    return (
        <header className={`header ${isAuthorized ? 'header_authorized' : ''}`}>
            <Logo />
            {isAuthorized ? (<NavigationAuthorized />) : (<NavigationUnauthorized />) }
        </header>
    );
}

export default Header;