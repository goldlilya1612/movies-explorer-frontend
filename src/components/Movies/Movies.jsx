import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({setIsPopupOpen, setErrorMessage }) {

    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [isMoviesVisible, setIsMoviesVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);

    const [filterError, setFilterError] = useState(false);

    const foundMoviesList = localStorage.foundMovies;

    useEffect(() => {
        if (localStorage.getItem('foundMovies')) {
            setIsPreloaderVisible(false);
            setFoundMovies(JSON.parse(foundMoviesList));
            setIsMoviesVisible(true);
        }    
    }, [foundMoviesList, shortMovies])

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

    /*
    const loadMore = () => {
        console.log('click');
    } */

    return (
        <> 
            <Preloader isPreloaderVisible={isPreloaderVisible}/>
            <Header />
            <section className="movies">
                <SearchForm onSearch={handleSearch} onCheckboxClick={handleCheckboxClick}/>
                {
                    filterError ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) :
                        isChecked ? (<MoviesCardList list={shortMovies} isMoviesVisible={isMoviesVisible}/>) : 
                            foundMovies.length === 0 ? (<h2 className="movies__filter-error">Ничего не найдено</h2>) : 
                                (<MoviesCardList list={foundMovies} isMoviesVisible={isMoviesVisible}/>)
                }
                {/*<button onClick={loadMore} className="movies__button">Еще</button> */}
            </section>
            <Footer />
        </>
        
    );
}

export default Movies;