import "./MoviesCard.css";


// isNotSavedMoviesPage = false -- кнопка с крестиком;
// isNotSavedMoviesPage = true && isAdded = false -- кнопка сохранить
// isNotSavedMoviesPage = true && isAdded = true -- кнопка c галочкой

const isNotSavedMoviesPage = true;
const isAdded = false;

function MoviesCard({movie}) {

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={`${movie.trailerLink}`} target="_blank" rel="noopener noreferrer">
                <img className="movies-card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt="Фильм"></img>
            </a>
            { isNotSavedMoviesPage ? 
                    isAdded ? (<button className="movies-card__button movies-card__button_added" type="submit"></button>)
                    : (<button className="movies-card__button movies-card__button_save" type="submit">Сохранить</button>) 
                : (<button className="movies-card__button movies-card__button_delete" type="submit"></button>)
            }
            <div className="movies-card__wrapper">
                <p className="movies-card__name">{movie.nameRU}</p>
                <p className="movies-card__duration">{movie.duration}мин</p>
            </div>
        </div>
    );
}

export default MoviesCard;