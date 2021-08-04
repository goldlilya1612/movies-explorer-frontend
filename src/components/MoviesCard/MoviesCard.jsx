import { useState } from "react";
import "./MoviesCard.css";


// isNotSavedMoviesPage = false -- кнопка с крестиком;
// isNotSavedMoviesPage = true && isAdded = false -- кнопка сохранить
// isNotSavedMoviesPage = true && isAdded = true -- кнопка c галочкой

const isNotSavedMoviesPage = true;
 const isSaved = false;

function MoviesCard({movie, onSave, onDelete, savedMovies}) {
    const handleSaving = () => {
        onSave(movie);
    }

    const handleDelete = () => {
        onDelete(movie);
    }
    /*
    console.log(movie.id);
    console.log(savedMovies);
    console.log(savedMovies.some((item) => item.id === movie.movieId))
    const isSaved = savedMovies.some((item) => item.id === movie.movieId); */

    return (
        <div className="movies-card">
            {
                window.location.pathname === '/movies' && 
                (<>
                    <a className="movies-card__link" href={`${movie.trailerLink}`} target="_blank" rel="noopener noreferrer">
                        <img className="movies-card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt="Фильм"></img>
                    </a>
                    {
                        isSaved ? (<button className="movies-card__button movies-card__button_added" type="submit"></button>):
                        (<button onClick={handleSaving} className="movies-card__button movies-card__button_save" type="submit">Сохранить</button>)
                    }
                </>)
            }
            {
                window.location.pathname === '/saved-movies' &&
                (<>
                    <img className="movies-card__image" src={movie.image} alt="Фильм"></img>
                    <button className="movies-card__button movies-card__button_delete" type="submit" onClick={handleDelete}></button>
                </>)
            }
            <div className="movies-card__wrapper">
                <p className="movies-card__name">{movie.nameRU}</p>
                <p className="movies-card__duration">{movie.duration}мин</p>
            </div>
        </div>
    );
}

export default MoviesCard;