import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
            <button className="movies__button">Еще</button>
        </section>
    );
}

export default Movies;