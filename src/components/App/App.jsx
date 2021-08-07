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
import {mainApi} from '../../utils/MainApi';
import Popup from "../Popup/Popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Error from "../Error/Error";

function App() {

    const history = useHistory(); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState({name:'', email:''});
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

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

    const handleRegister = (data, setData, setIsValid, setErrors, resetForm) => {
        const { email, password, name } = data;
        return auth.register({ email, password, name })
            .then(() => {
                handleLogin({ email, password }, setData, setIsValid, setErrors, resetForm);
            })
            .catch((err) => {
                if (err === 'Ошибка: 409') {
                    setMessage('Пользователь с таким email уже зарегистрирован');
                    setIsPopupOpen(true);
                } else if (err === 'Ошибка: 400') {
                    setMessage('Ошибка валидации');
                    setIsPopupOpen(true);
                }
            });
    }

    const handleLogin = (data, setData, setIsValid, setErrors, resetForm) => {
        const {email, password} = data;
        return auth.login({email, password})
            .then((data) => {
                setIsInputDisabled(true);
                setIsPreloaderVisible(true);
                if (!data) throw new Error ('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    
                    auth.getUserInfo(localStorage.getItem('token'))
                    .then((res) => {
                        setCurrentUser({name: res.name, email: res.email })
                        localStorage.setItem('loggedIn', true);
                        history.push('/movies');
                    })
                    .catch((err) => { console.log(`Ошибка: ${err}`)})
                } else {
                    localStorage.removeItem('token');
                    history.push('/signin');
                }
            })
            .finally(() => {
                resetForm();
                setIsInputDisabled(false);
                setIsPreloaderVisible(false);
            })
            .catch((err) => {
                if (err === 'Ошибка: 400') {
                    setMessage('Вы ввели неправильный логин или пароль.');
                    setIsPopupOpen(true);
                }
            });
    }

    const updateUser = (data) => {
        mainApi.updateUser(data, localStorage.getItem('token'))
            .then((data) => {
                setCurrentUser(data);
                setIsInputDisabled(true)
                setIsPreloaderVisible(true);
            })
            .finally(() => {
                setIsInputDisabled(false);
                setIsPreloaderVisible(false);
                setMessage('Данные сохранены');
                setIsPopupOpen(true);
            })
            .catch((err) => {
                if (err === 'Ошибка 409') {
                    setMessage('Пользователь с таким email уже существует.');
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
            })
            .catch((err) => { 
                console.log(`Ошибка: ${err}`);
                handleLogout();
            })
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <ProtectedRoute 
                        path="/movies" 
                        component={Movies}
                    >
                    </ProtectedRoute>
                    <ProtectedRoute 
                        path="/saved-movies"
                        component={SavedMovies}>
                    </ProtectedRoute>
                    <ProtectedRoute 
                        path='/profile'
                        component={Profile} 
                        onUpdateUser={updateUser}
                        onLogout={handleLogout}
                        isPreloaderVisible={isPreloaderVisible}
                        isInputDisabled={isInputDisabled}>
                    </ProtectedRoute>

                    <Route exact path="/">
                        <Header />
                        <Main/>
                        <Footer />
                    </Route>
                    <Route path="/signin">
                        <Login isInputDisabled={isInputDisabled} onLogin={handleLogin}/>
                    </Route>
                    <Route path="/signup">
                        <Register isInputDisabled={isInputDisabled} onRegister={handleRegister} />
                    </Route>
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>

                <Popup isOpen={isPopupOpen} onClose={handlePopupClose} message={message}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
