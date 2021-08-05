import { mainApi } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {

    const [savedMovies, setSavedMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [isMoviesVisible, setIsMoviesVisible] = useState(false);
    const [filterError, setFilterError] = useState(false);

    useEffect(() => {
        mainApi.getSavedMovies(localStorage.getItem('token'))
            .then((movies) => {
                localStorage.setItem('savedMovies', JSON.stringify(movies))
                setIsPreloaderVisible(true);
                setSavedMovies(movies);
            })
            .finally(() => {
                setIsPreloaderVisible(false)
                setIsMoviesVisible(true);
            })  
    }, [])

    const handleSearch = (data) => {
        const keyword = data.film;
        setIsPreloaderVisible(true);
        handleFilter(keyword);
    }

    //поиск по ключевому слову
    const handleFilter = (keyword) => {
        const filtredMovies = filterMovies(savedMovies, keyword);
        setIsPreloaderVisible(false);
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
        setSavedMovies(filtredMovies);
    }

    const handleCheckboxClick = (isChecked) => {
        setFilterError(false);
        setIsPreloaderVisible(true);
        if (isChecked) {
            const shortMoviesList = savedMovies.filter((movie) => {
                return movie.duration < 40;
            });
            //если нет короткометражек
            if (shortMoviesList.length === 0) {
                setFilterError(true);
            } else {
                setShortMovies(shortMoviesList);
            }
        } else {
            if (savedMovies.length === 0) {
                setFilterError(true);
            }
        }
        setIsChecked(isChecked);
        setIsPreloaderVisible(false);
    }

    const handleDelete = (movie) => {
        mainApi.deleteMovie(movie._id, localStorage.getItem('token'))
            .then(() => {
                mainApi.getSavedMovies(localStorage.getItem('token'))
                    .then((movies) => {
                        console.log(movies);
                        setSavedMovies(movies);
                        //localStorage.setItem('savedMovies', JSON.stringify(movies));
                });
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
                    isChecked ? (<MoviesCardList savedMovies={savedMovies} onDelete={handleDelete} list={shortMovies} isMoviesVisible={isMoviesVisible}/>) : 
                        (<MoviesCardList savedMovies={savedMovies} onDelete={handleDelete} list={savedMovies} isMoviesVisible={isMoviesVisible}/>)
                }
            </section>
            <Footer />
        </>
        
    );
}

export default SavedMovies;