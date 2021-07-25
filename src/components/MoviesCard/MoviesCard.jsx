import "./MoviesCard.css";
import image from '../../images/movie-image.jpg';

const isMoviesPage = true;
const isAdded = true;

function MoviesCard({card}) {
    return (
        <div className="movies-card">
            <img className="movies-card__image" src={image} alt="Карточка"></img>
            { isMoviesPage ? 
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