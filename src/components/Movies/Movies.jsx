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
    const [filterError, setFilterError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [cardsMobileNumber, setCardsMobileNumber] = useState(0);
    const [cardsTabletNumber, setCardsTabletNumber] = useState(0);
    const [cardsComputerNumber, setCardsComputerNumber] = useState(0);

    

    const path = window.location.pathname;
    const foundMoviesList = localStorage.foundMovies;


    console.log(cardsMobileNumber + 5);
    console.log(JSON.parse(localStorage.foundMovies).length);

    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setIsPreloaderVisible(false);
            setFoundMovies(JSON.parse(foundMoviesList));
        }
    }, [foundMoviesList])

    useEffect(() => {
        handleButtonVisibility();
    })

    const windowWidth = document.body.clientWidth;
    const MOBILE = windowWidth >= 320 && windowWidth <= 480;
    const TABLET = windowWidth > 480 && windowWidth < 1280;
    const COMPUTER = windowWidth >= 1280;

    const handleButtonVisibility = () => {
        if (
            ((cardsComputerNumber + 12) < JSON.parse(localStorage.foundMovies).length && COMPUTER) ||
            ((cardsTabletNumber + 8) < JSON.parse(localStorage.foundMovies).length && TABLET) ||
            ((cardsMobileNumber + 5) < JSON.parse(localStorage.foundMovies).length && MOBILE)) 
            {
                setIsButtonVisible(true);
        } else {
            setIsButtonVisible(false);
        }
    }

    useEffect(() => {
        //получение данных о пользователе и сохраненных фильмах
        Promise.all([mainApi.getSavedMovies(localStorage.getItem('token'))])
            .then(([movies]) => {
                setSavedMovies(movies);
            })
            .catch(err => console.log(err));
    }, []);

    //некоторые фильмы могут не иметь постера, русского названия и т.д. подумай над этим в данной функции
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
        if (path === '/movies') {
            moviesApi.getMovies()
            .then((movies) => {
                const filtredMovies = filterMovies(movies, keyword);
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
    }

    //клик по переключателю
    const handleCheckboxClick = (isChecked) => {
        setFilterError(false);
        setIsPreloaderVisible(true);
        if (isChecked) {
            const shortMoviesList = foundMovies.filter((movie) => {
                return movie.duration < 40;
            });
            //если нет короткометражек
            if (shortMoviesList.length === 0) {
                setFilterError(true);
            } else {
                setShortMovies(shortMoviesList);
            }
        }
        setIsChecked(isChecked);
        setIsPreloaderVisible(false);
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
        if (MOBILE) {
            setCardsMobileNumber(state => state + 2);
        } else if (TABLET) {
            setCardsTabletNumber(state => state + 2);
        } else if (COMPUTER) {
            setCardsComputerNumber(state => state + 5);
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
                                        cardsMobileNumber={cardsMobileNumber}
                                        cardsComputerNumber={cardsComputerNumber}
                                    />) : 
                                        foundMovies.length === 0 ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) : 
                                        (<MoviesCardList 
                                            onChangeButtonStatus={handlechangeMovieButtonStatus}
                                            savedMovies={savedMovies} 
                                            list={foundMovies} 
                                            cardsMobileNumber={cardsMobileNumber}
                                            cardsTabletNumber={cardsTabletNumber}
                                            cardsComputerNumber={cardsComputerNumber}
                                        />)
                }
                <button onClick={loadMore} className={`movies__button ${isButtonVisible ? '' : 'movies__button_invisible'}`}>Еще</button>
            </section>
            <Footer />
        </> 
    );
}

export default Movies;