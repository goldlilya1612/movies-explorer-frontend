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
//import Preloader from "../Preloader/Preloader";
//import Error from "../Error/Error";

function App() {

    const history = useHistory(); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handleRegister = (data) => {
        const { email, password, name } = data;
        return auth.register({ email, password, name })
            .then(() => {
                history.push('/signin');
            })
            .catch((err) => console.log(err));
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
        </div>
    );
}

export default App;
