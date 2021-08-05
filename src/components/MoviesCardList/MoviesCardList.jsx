import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { MOBILE, TABLET, COMPUTER } from '../../utils/constants'

function MoviesCardList(
    {list,
     onChangeButtonStatus, 
     onDelete, 
     savedMovies,
     cardsMobileNumber, 
     cardsComputerNumber, 
     cardsTabletNumber
     }) {

    return (
        <section className={`movies-card-list`}>
            {
                window.location.pathname === '/movies' && MOBILE &&
                list.slice(0, 5 + cardsMobileNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }
            {
                window.location.pathname === '/movies' && TABLET &&
                list.slice(0, 8 + cardsTabletNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }
            {
                window.location.pathname === '/movies' && COMPUTER &&
                list.slice(0, 12 + cardsComputerNumber).map(movie => (<MoviesCard savedMovies={savedMovies} key={movie.id} movie={movie} onChangeButtonStatus={onChangeButtonStatus}/>))
            }



            {
                window.location.pathname === '/saved-movies' &&
                list.map(movie =>(<MoviesCard onDelete={onDelete} savedMovies={savedMovies} key={movie._id} movie={movie} />))
            }
        </section>
    );
}

export default MoviesCardList;