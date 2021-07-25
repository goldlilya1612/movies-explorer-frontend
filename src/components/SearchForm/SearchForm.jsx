import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
    return ( 
            <form className="search-form">
                <input placeholder="Фильм" className="search-form__input" type="search"></input>
                <button className="search-form__button" type="submit"></button>
                <div className="search-form__checkbox-wrapper">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-text">Короткометражки</p>
                </div>
                
            </form>   
    );
}

export default SearchForm;