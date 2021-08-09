import { mainApi } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {

    const [savedFoundMovies, setSavedFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [filterError, setFilterError] = useState(false);

    useEffect(() => {
        mainApi.getSavedMovies(localStorage.getItem('token'))
            .then((movies) => {
                setIsPreloaderVisible(true);
                setSavedMovies(movies);

                if (!localStorage.getItem('savedFoundMovies')) {
                    setSavedFoundMovies(movies);
                } 
            })
            .finally(() => {
                setIsPreloaderVisible(false)
            });
    }, [savedFoundMovies.length])

    //поиск
    const handleSearch = (data) => {
        const keyword = data.film;
        setIsPreloaderVisible(true);
        handleFilter(keyword);
        setIsPreloaderVisible(false);
    }


    //поиск по ключевому слову
    const handleFilter = (keyword) => {
        setFilterError(false);
        const filtredMovies = filterMovies(savedMovies, keyword);
        if (!isChecked) {
            // вывести ошибку, если фильмы не прошли фильтр по слову
            if (filtredMovies.length === 0) {
                setFilterError(true);
            } 
        } else {
            const shortFiltredMovies = filtredMovies.filter(movie => {
                return movie.duration < 40;
            })
            setShortMovies(shortFiltredMovies);
        }
        localStorage.setItem('savedFoundMovies', JSON.stringify(filtredMovies));
        setSavedFoundMovies(filtredMovies);
    }


    //клик по переключателю
    const handleCheckboxClick = (isChecked) => {
        setFilterError(false);
        setIsPreloaderVisible(true);
        if (isChecked) {
            const shortMoviesList = savedFoundMovies.filter((movie) => {
                return movie.duration < 40;
            });
            //если нет короткометражек
            if (shortMoviesList.length === 0) {
                setFilterError(true);
            } else {
                setShortMovies(shortMoviesList);
            }
        } else {
            if (savedFoundMovies.length === 0) {
                setFilterError(true);
            }
        }
        setIsChecked(isChecked);
        setIsPreloaderVisible(false);
    }

    const handleDelete = (movie) => {
        mainApi.deleteMovie(movie._id, localStorage.getItem('token'))
            .then(() => {
                setSavedFoundMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
    }

    const filterMovies = (movies, keyword) => {
        const filtredMovies = movies.filter(movie => {
            if (movie.nameEN === null) {
                movie.nameEN = movie.nameRU;
            }
            return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
        });
        return filtredMovies
    }

    return (
        <> 
            <Preloader isPreloaderVisible={isPreloaderVisible}/>
            <Header />
            <section className="saved-movies">
                <SearchForm onSearch={handleSearch} onCheckboxClick={handleCheckboxClick}/>
                {filterError ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) :
                    isChecked ? (<MoviesCardList savedMovies={savedMovies} onDelete={handleDelete} list={shortMovies} />) :
                        savedFoundMovies.length === 0 ? 
                            (<MoviesCardList savedMovies={savedMovies} onDelete={handleDelete} list={savedMovies} />) :
                            (<MoviesCardList savedMovies={savedMovies} onDelete={handleDelete} list={savedFoundMovies} />)
                }
            </section>
            <Footer />
        </>
        
    );
}

export default SavedMovies;