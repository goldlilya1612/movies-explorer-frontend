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
import { useEffect, useState } from "react";
import {CurrentUserContext} from '../../contexts/currentUserContext';
import {api} from '../../utils/api';
import ErrPopup from "../ErrPopup/ErrPopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
//import Preloader from "../Preloader/Preloader";
//import Error from "../Error/Error";

function App() {

    const history = useHistory(); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentUser, setCurrentUser] = useState({name:'', email:''});
    const loggedIn = localStorage.getItem('loggedIn');

    useEffect(() => {
        //получение данных о пользователе и карточках из сервера
        if (localStorage.loggedIn === 'true'){
            Promise.all([/*api.getInitialCards(localStorage.getItem('token')),*/ api.getUserInfo(localStorage.getItem('token'))])
                .then(([/*cardList,*/ res]) => {
                    //setCards(cardList);
                    setCurrentUser(res);
                })
                .catch(err => console.log(err));
        }
    }, [loggedIn]);

    useEffect(() => {
        tokenCheck()
    }, []);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') && (window.location.pathname === '/signin' || window.location.pathname === '/signup')) {
            history.push("/movies");
        }
    }, [history]);

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    }

    const handleRegister = (data) => {
        const { email, password, name } = data;
        return auth.register({ email, password, name })
            .then(() => {
                handleLogin({ email, password })
            })
            .catch((err) => {
                if (err === 'Ошибка: 409') {
                    setErrorMessage('Пользователь с таким email уже зарегистрирован');
                    setIsPopupOpen(true);
                } else if (err === 'Ошибка: 400') {
                    setErrorMessage('Ошибка валидации');
                    setIsPopupOpen(true);
                }
            });
    }

    const handleLogin = (data) => {
        const {email, password} = data;
        return auth.login({email, password})
            .then((data) => {
                if (!data) throw new Error ('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                } else {
                    localStorage.removeItem('token');
                    history.push('/signin');
                }
            })
            .catch((err) => {
                if (err === 'Ошибка: 400') {
                    setErrorMessage('Вы ввели неправильный логин или пароль.');
                    setIsPopupOpen(true);
                }
            });
    }

    const updateUser = (data) => {
        api.updateUser(data, localStorage.getItem('token'))
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                if (err === 'Ошибка 409') {
                    setErrorMessage('Пользователь с таким email уже существует.');
                    setIsPopupOpen(true);
                }
            })
    }

    //проверка токена
    const tokenCheck = () => {
        if (localStorage.getItem('token')) {
            auth.getUserInfo(localStorage.getItem('token'))
            .then((res) => {
                setCurrentUser({name: res.name, email: res.email })
                localStorage.setItem('loggedIn', true);
                history.push('/movies');
            })
            .catch((err) => { console.log(`Ошибка: ${err}`)})
    }}

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        history.push('/signin');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <ProtectedRoute 
                        path="/movies"
                        component={Movies}>
                    </ProtectedRoute>
                    <ProtectedRoute 
                        path="/saved-movies"
                        component={SavedMovies}>
                    </ProtectedRoute>
                    <ProtectedRoute 
                        path='/profile'
                        loggedIn={loggedIn}
                        component={Profile} 
                        onUpdateUser={updateUser}
                        onLogout={handleLogout}>
                    </ProtectedRoute>

                    <Route exact path="/">
                        <Header />
                        <Main/>
                        <Footer />
                    </Route>
                    <Route path="/signin">
                        <Login onLogin={handleLogin}/>
                    </Route>
                    <Route path="/signup">
                        <Register onRegister={handleRegister} />
                    </Route>
                </Switch>

                <ErrPopup isOpen={isPopupOpen} onClose={handlePopupClose} errorMessage={errorMessage}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
