import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ list, isMoviesVisible }) {
    return (
        <section className={`movies-card-list ${isMoviesVisible ? '' : 'movies-card-list_invisible'}`}>
            {list.map(movie => (<MoviesCard key={movie.id} movie={movie}/>))}
        </section>
    );
}

export default MoviesCardList;