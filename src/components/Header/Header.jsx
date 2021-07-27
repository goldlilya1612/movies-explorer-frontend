import "./Header.css";
import NavigationUnauthorized from '../NavigationUnauthorized/NavigationUnauthorized';
import NavigationAuthorized from '../NavigationAuthorized/NavigationAuthorized';
import Logo from "../Logo/Logo";

const Header = () => {

    //В зависимости от переменной isAuthorised меняется хедер на странице Main.
    const isAuthorised = false;
    const notMainPage = window.location.pathname !== '/'

    return (
        <>
        {notMainPage ? 
            (<header className="header header_authorized">
                <Logo />
                <NavigationAuthorized />
            </header>) :
            (<header className={`header ${isAuthorised ? 'header_authorized' : ''}`}>
                <Logo />
                {isAuthorised ? (<NavigationAuthorized />) : (<NavigationUnauthorized />) }
            </header>)
        }
        </>    
    );
}

export default Header;