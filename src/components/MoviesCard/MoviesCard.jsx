import "./MoviesCard.css";
import image from '../../images/movie-image.jpg';



// Если изменить isAdded на false, то появится кнопка сохранить на странице /movies
// Если изменить isAdded на true, то появится красная кнопка c галочкой на странице /movies
const isNotSavedMoviesPage = window.location.pathname === '/movies';
const isAdded = false;

function MoviesCard({card}) {
    return (
        <div className="movies-card">
            <img className="movies-card__image" src={image} alt="Карточка"></img>
            { isNotSavedMoviesPage ? 
                    isAdded ? (<button className="movies-card__button movies-card__button_added" type="submit"></button>)
                    : (<button className="movies-card__button movies-card__button_save" type="submit">Сохранить</button>) 
                : (<button className="movies-card__button movies-card__button_delete" type="submit"></button>)
            }
            <div className="movies-card__wrapper">
                <p className="movies-card__name">{card.name}</p>
                <p className="movies-card__duration">{card.duration}</p>
            </div>
        </div>
    );
}

export default MoviesCard;