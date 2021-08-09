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
import { moviesApi } from "../../utils/MoviesApi";

function App() {

    const history = useHistory(); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState({name:'', email:''});
    const [isDisabled, setIsDisabled] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [moviesLength, setMoviesLength] = useState(0);
    const [addedMovies, setAddedMovies] = useState(0);

    useEffect(() => {
        tokenCheck();
        handleMoviesLength();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(() => {
                setAddedMovies(0);
                handleMoviesLength();
            }, 1000) 
        });
    }, [])

    useEffect(() => {
        moviesApi.getMovies()
            .then((movies) => {
                setAllMovies(movies);
            })
    }, []);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') && (window.location.pathname === '/signin' || window.location.pathname === '/signup')) {
            history.push("/movies");
        }
    }, [history]);

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    }

    const handleMoviesLength = () => {
        const windowWidth = document.body.clientWidth;
        if (windowWidth >= 320 && windowWidth <= 480) {
            setMoviesLength(5);
        } else if (windowWidth > 480 && windowWidth < 1137) {
            setMoviesLength(8);
        } else if (windowWidth >= 1137) {
            setMoviesLength(12);
        }
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
                setIsDisabled(true);
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
                setIsDisabled(false);
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
                setIsDisabled(true)
                setIsPreloaderVisible(true);
            })
            .finally(() => {
                setIsDisabled(false);
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
                        allMovies={allMovies}
                        moviesLength={moviesLength}
                        addedMovies={addedMovies}
                        setAddedMovies={setAddedMovies}
                        setMoviesLength={setMoviesLength}
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
                        isDisabled={isDisabled}>
                    </ProtectedRoute>

                    <Route exact path="/">
                        <Header />
                        <Main/>
                        <Footer />
                    </Route>
                    <Route path="/signin">
                        <Login isDisabled={isDisabled} onLogin={handleLogin}/>
                    </Route>
                    <Route path="/signup">
                        <Register isDisabled={isDisabled} onRegister={handleRegister} />
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
