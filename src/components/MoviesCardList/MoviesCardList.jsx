import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ list, onChangeButtonStatus, onDelete, savedMovies, cardsMobileNumber, cardsComputerNumber, cardsTabletNumber }) {

    const windowWidth = document.body.clientWidth;

    const MOBILE = windowWidth >= 320 && windowWidth <= 480;
    const TABLET = windowWidth > 480 && windowWidth < 1280;
    const COMPUTER = windowWidth >= 1280;

    return (
        <section className={`movies-card-list`}>
            {
                window.location.pathname === '/movies' && MOBILE &&
                list.slice(0, 5 + cardsMobileNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }
            {
                window.location.pathname === '/movies' && TABLET &&
                list.slice(0, 8 + cardsTabletNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }
            {
                window.location.pathname === '/movies' && COMPUTER &&
                list.slice(0, 12 + cardsComputerNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }



            {
                window.location.pathname === '/saved-movies' &&
                list.map(movie =>(<MoviesCard onDelete={onDelete} savedMovies={savedMovies} key={movie._id} movie={movie} />))
            }
        </section>
    );
}

export default MoviesCardList;