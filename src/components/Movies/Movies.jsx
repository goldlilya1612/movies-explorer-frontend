import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { moviesApi } from "../../utils/MoviesApi";
import {mainApi} from '../../utils/MainApi';

function Movies() {

    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [isMoviesVisible, setIsMoviesVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filterError, setFilterError] = useState(false);

    const path = window.location.pathname;
    const foundMoviesList = localStorage.foundMovies;
    const loggedIn = localStorage.getItem('loggedIn');


    console.log(savedMovies);

    //TODO: убрать условие
    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setIsPreloaderVisible(false);
            setFoundMovies(JSON.parse(foundMoviesList));
            setIsMoviesVisible(true);
        }    
    }, [foundMoviesList, shortMovies])

    useEffect(() => {
        mainApi.getSavedMovies(localStorage.getItem('token'))
            .then((movies) => {
                setSavedMovies(movies);
                setIsMoviesVisible(true);
            });
    }, [path]) 

    //некоторые фильмы могут не иметь постера, русского названия и т.д. подумай над этим в данной функции
    const handleSearch = (data) => {
        const keyword = data.film;
        setIsPreloaderVisible(true);

        handleFilter(keyword);
        setIsMoviesVisible(true);
    }
    

    //поиск по ключевому слову
    const handleFilter = (keyword) => {
        moviesApi.getMovies()
            .then((movies) => {
                const filtredMovies = movies.filter(movie => {
                    if (movie.nameEN === null) {
                        movie.nameEN = movie.nameRU;
                        
                    }
                    return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
                });
                if (!isChecked) {
                    // спрятать прелоудер, если найденные фильмы совпадают с найденными ранее на одну итерацию фильмами 
                    if (JSON.stringify(filtredMovies) === localStorage.foundMovies) {
                        setIsPreloaderVisible(false);
                    // вывести ошибку, если фильмы не прошли фильтр по слову
                    } else if (filtredMovies.length === 0) {
                        setFilterError(true);
                    } 
                } else {
                    const shortFiltredMovies = filtredMovies.filter(movie => {
                        return movie.duration < 40;
                    })
                    setShortMovies(shortFiltredMovies);
                }
                localStorage.setItem('foundMovies', JSON.stringify(filtredMovies));
                setFoundMovies(filtredMovies);
            })
    }


    //клик по переключателю
    const handleCheckboxClick = (isChecked) => {
        setFilterError(false);
        setIsPreloaderVisible(true);
        if (isChecked) {
            const shortMoviesList = foundMovies.filter((movie) => {
                return movie.duration < 40;
            })
            //если нет короткометражек
            if (shortMoviesList.length === 0) {
                setFilterError(true);
            } else {
                setShortMovies(shortMoviesList);
            }
        }
        setIsChecked(isChecked);
        setIsPreloaderVisible(false)
    }


    const handleSaving = (movie) => {

        const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        const movieId = movie.id;
        const trailer = movie.trailerLink;
        const image = `https://api.nomoreparties.co${movie.image.url}`
        const {
            country,
            director,
            duration,
            year,
            description,
            nameRU,
            nameEN,
        } = movie;

        //const isCardSaved = 

        mainApi.saveMovie({   
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId,
        }, localStorage.getItem('token'))
        .then(() => {
            console.log('save');
        })
        .catch((err) => console.log(`Ошибка: ${err}`)) 
    }
    /*
    const loadMore = () => {
        console.log('click');
    } */

    return (
        <> 
            <Preloader isPreloaderVisible={isPreloaderVisible}/>
            <Header />
            {
                path === '/saved-movies' && 
                (<section className="saved-movies">
                    <SearchForm onSearch={handleSearch} onCheckboxClick={handleCheckboxClick}/>
                    <MoviesCardList 
                        list={savedMovies}
                        isMoviesVisible={isMoviesVisible}
                    />
                </section>)
            }
            {
                path === '/movies' &&
                (<section className="movies">
                <SearchForm onSearch={handleSearch} onCheckboxClick={handleCheckboxClick}/>
                    {
                        filterError ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) :
                            isChecked ? (<MoviesCardList 
                                            onSave={handleSaving} 
                                            list={shortMovies}
                                            isMoviesVisible={isMoviesVisible}
                                        />) : 
                                            foundMovies.length === 0 ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) : 
                                            (<MoviesCardList 
                                                onSave={handleSaving} 
                                                list={foundMovies} 
                                                isMoviesVisible={isMoviesVisible}
                                            />)
                    }
                    {/*<button onClick={loadMore} className="movies__button">Еще</button> */}
                </section>)
            }
            <Footer />
        </>
        
    );
}

export default Movies;