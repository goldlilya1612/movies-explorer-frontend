import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { mainApi } from '../../utils/MainApi';

function Movies({allMovies, moviesLength, addedMovies, setAddedMovies}) {

    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [filterError, setFilterError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        //получение данных о пользователе и сохраненных фильмах
        Promise.all([mainApi.getSavedMovies(localStorage.getItem('token'))])
            .then(([savedMovies]) => {
                setSavedMovies(savedMovies);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setIsPreloaderVisible(false);
            setFoundMovies(JSON.parse(localStorage.foundMovies));
            setFilterError(false);
        }
    }, [])
    
    useEffect(() => {
        if (localStorage.getItem('shortMovies') || localStorage.getItem('foundMovies')) {
            handleButtonVisibility();
        };
    })

    const handleButtonVisibility = () => {
        if (isChecked){
            setButtonVisibility(shortMovies.length)
        } else {
            setButtonVisibility(foundMovies.length)
        }
    }

    const setButtonVisibility = (arrayLength) => {

        if (
            ((addedMovies + moviesLength) < arrayLength))
            {
                setIsButtonVisible(true);
        } else {
            setIsButtonVisible(false);
        }
    }

    const handleSearch = (data) => {
        const keyword = data.film;
        setIsPreloaderVisible(true);
        handleFilter(keyword);
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

    //поиск по ключевому слову
    const handleFilter = (keyword) => {
        setFilterError(false);
        const filtredMovies = filterMovies(allMovies, keyword);
        localStorage.setItem('foundMovies', JSON.stringify(filtredMovies));
        setFoundMovies(filtredMovies);

        if (!isChecked) {
            if (filtredMovies.length === 0) {
                handleUnsuccessfulFilter('foundMovies');
            } 
        } else {
            const shortFiltredMovies = filtredMovies.filter(movie => {
                return movie.duration < 40;
            })
            if (shortFiltredMovies.length === 0) {
                handleUnsuccessfulFilter('shortMovies');
            } else {
                setShortMovies(shortFiltredMovies);
                localStorage.setItem('shortMovies', JSON.stringify(shortFiltredMovies)); 
            }
        }
        setIsPreloaderVisible(false);
    }

    //клик по переключателю
    const handleCheckboxClick = (isChecked) => {
        setFilterError(false);
        setIsPreloaderVisible(true);
        setAddedMovies(0);
        if (isChecked) {
            const shortMoviesList = foundMovies.filter((movie) => {
                return movie.duration < 40;
            });
            //если нет короткометражек
            if (shortMoviesList.length === 0) {
                handleUnsuccessfulFilter('shortMovies');
            } else {
                setShortMovies(shortMoviesList);
                localStorage.setItem('shortMovies', JSON.stringify(shortMoviesList));
            }
        } else {
            if (JSON.parse(localStorage.foundMovies).length === 0) {
                handleUnsuccessfulFilter('foundMovies');
            }
            setShortMovies([]);
            localStorage.setItem('shortMovies', JSON.stringify([]));
            setFoundMovies(JSON.parse(localStorage.foundMovies));
        }
        setIsChecked(isChecked);
        setIsPreloaderVisible(false);
    }

    const handleUnsuccessfulFilter = (array) => {
        setFilterError(true);
        localStorage.setItem(array, JSON.stringify([]));
    }

    const handlechangeMovieButtonStatus = (movie) => {
        const isSaved = savedMovies.some(item => item.movieId === movie.id);
        if (isSaved) {
            const savedMovie = savedMovies.find(item => item.movieId === movie.id);
            mainApi.deleteMovie(savedMovie._id, localStorage.getItem('token'))
                .then(() => {
                    mainApi.getSavedMovies(localStorage.getItem('token'))
                    .then((movies) => {
                        setSavedMovies(movies);
                    });
                })  
                .catch((err) => console.log(`Ошибка: ${err}`))

        } else {
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
                mainApi.getSavedMovies(localStorage.getItem('token'))
                    .then((movies) => {
                        setSavedMovies(movies);
                        localStorage.setItem('savedMovies', JSON.stringify(movies));
                });
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
        }
    }

    const loadMore = () => {
        if (document.body.clientWidth >= 320 && document.body.clientWidth <= 480) {
            setAddedMovies(state => state + 2);
        } else if ( document.body.clientWidth > 480 &&  document.body.clientWidth < 1280) {
            setAddedMovies(state => state + 2);
        } else if ( document.body.clientWidth >= 1280) {
            setAddedMovies(state => state + 3);
        } 
    }

    return (
        <> 
            <Preloader isPreloaderVisible={isPreloaderVisible}/>
            <Header />
            <section className="movies">
            <SearchForm onSearch={handleSearch} onCheckboxClick={handleCheckboxClick}/>
                {
                    filterError ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) :
                        isChecked ? (<MoviesCardList 
                                        onChangeButtonStatus={handlechangeMovieButtonStatus}
                                        savedMovies={savedMovies}
                                        list={shortMovies}
                                        moviesLength={moviesLength}
                                        addedMovies={addedMovies}
                                    />) : 
                                        foundMovies.length === 0 ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) : 
                                        (<MoviesCardList 
                                            onChangeButtonStatus={handlechangeMovieButtonStatus}
                                            savedMovies={savedMovies} 
                                            list={foundMovies} 
                                            moviesLength={moviesLength}
                                            addedMovies={addedMovies}
                                        />)
                }
                <button onClick={loadMore} className={`movies__button ${isButtonVisible ? '' : 'movies__button_invisible'}`}>Еще</button>
            </section>
            <Footer />
        </> 
    );
}

export default Movies;