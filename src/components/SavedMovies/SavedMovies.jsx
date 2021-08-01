import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
    return (
        <> 
            <Header />
            <section className="saved-movies">
                <SearchForm />
                <MoviesCardList />
            </section>
            <Footer />
        </>
        
    );
}

export default SavedMovies;