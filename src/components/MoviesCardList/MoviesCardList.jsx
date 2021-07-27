import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { cards } from "../../utils/constants";

function MoviesCardList() {
    return (
        <section className="movies-card-list">
            {cards. map(card => (<MoviesCard card={card}/>) )}
        </section>
    );
}

export default MoviesCardList;