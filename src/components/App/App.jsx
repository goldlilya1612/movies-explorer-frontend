import "./App.css";
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

import * as auth from "../../utils/auth";
import { useState } from "react";
import ErrPopup from "../ErrPopup/ErrPopup";
//import Preloader from "../Preloader/Preloader";
//import Error from "../Error/Error";

function App() {

    const history = useHistory(); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    }

    const handleRegister = (data) => {
        const { email, password, name } = data;
        return auth.register({ email, password, name })
            .then(() => {
                history.push('/signin');
            })
            .catch((err) => {
                if (err === 'Ошибка: 409') {
                    setErrorMessage('Пользователь с таким email уже зарегистрирован');
                } else if (err === 'Ошибка: 400') {
                    setErrorMessage('Ошибка валидации');
                }
                setIsPopupOpen(true);
            });
    }

    return (
        <div className="page">
            <Switch>
                <Route exact path="/">
                    <Header />
                    <Main/>
                    <Footer />
                </Route>
                <Route path="/movies">
                    <Header />
                    <Movies />
                    <Footer />
                </Route>
                <Route path="/saved-movies">
                    <Header />
                    <SavedMovies />
                    <Footer />
                </Route>
                <Route path="/profile">
                    <Header />
                    <Profile />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Register onRegister={handleRegister} />
                </Route>
            </Switch>

            <ErrPopup isOpen={isPopupOpen} onClose={handlePopupClose} errorMessage={errorMessage}/>
        </div>
    );
}

export default App;
