import "./MoviesCard.css";

function MoviesCard({movie, onChangeButtonStatus, onDelete, savedMovies}) {

    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    const hour = Math.floor(movie.duration / 60);
    const minutes = Math.floor(movie.duration % 60);

    const handleChangeButtonStatus = () => {
        onChangeButtonStatus(movie);
    }
    const handleDelete = () => {
        onDelete(movie);
    }

    return (
        <div className="movies-card">
            {
                window.location.pathname === '/movies' && 
                (<>
                    <a className="movies-card__link" href={`${movie.trailerLink}`} target="_blank" rel="noopener noreferrer">
                        <img className="movies-card__image" src={`https://api.nomoreparties.co${movie.image.url}`|| `${movie.image.url}`} alt="Фильм"></img>
                    </a>
                    {
                        isSaved ? 
                        (<button onClick={handleChangeButtonStatus} className="movies-card__button movies-card__button_added" type="submit"></button>)
                        :
                        (<button onClick={handleChangeButtonStatus} className="movies-card__button movies-card__button_save" type="submit">Сохранить</button>)
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
                <p className="movies-card__duration">{hour}ч {minutes}м</p>
            </div>
        </div>
    );
}

export default MoviesCard;