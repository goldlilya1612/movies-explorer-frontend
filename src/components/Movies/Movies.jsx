import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import "./Movies.css";
import Footer from "../Footer/Footer";

function Movies() {
    console.log(localStorage.getItem('loggedIn'));
    return (
        <> 
            <Header />
            <section className="movies">
                <SearchForm />
                <MoviesCardList />
                <button className="movies__button">Еще</button>
            </section>
            <Footer />
        </>
        
    );
}

export default Movies;