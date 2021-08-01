import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({list}) {
    return (
        <section className="movies-card-list">
            {list.map(movie => (<MoviesCard key={movie.id} movie={movie}/>) )}
        </section>
    );
}

export default MoviesCardList;