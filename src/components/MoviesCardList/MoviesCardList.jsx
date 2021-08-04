import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ list, onSave, onDelete, savedMovies }) {

    return (
        <section className={`movies-card-list`}>
            {
                window.location.pathname === '/movies' &&
                list.map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onSave={onSave}/>))
            }
            {
                window.location.pathname === '/saved-movies' &&
                list.map(movie =>(<MoviesCard onDelete={onDelete} savedMovies={savedMovies} key={movie._id} movie={movie} />))
            }
        </section>
    );
}

export default MoviesCardList;