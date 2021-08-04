import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ list, isMoviesVisible, onSave }) {

    return (
        <section className={`movies-card-list ${isMoviesVisible ? '' : 'movies-card-list_invisible'}`}>
            {
                window.location.pathname === '/movies' &&
                list.map(movie => (<MoviesCard key={movie.id} movie={movie} onSave={onSave}/>))
            }
            {
                window.location.pathname === '/saved-movies' &&
                list.map(movie =>(<MoviesCard key={movie._id} movie={movie} />))
            }
        </section>
    );
}

export default MoviesCardList;