import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useCallback, useState } from "react";

function SearchForm({onSearch, onCheckboxClick}) {

    const [data, setData] = useState({film: ''});

    const handleChange = (e) => {
        const target = e.target;
        const {name, value} = target;
        setData({...data, [name]: value})
    }

    const resetForm = useCallback(
        (newData = {
            film: '',
        }) => {
          setData(newData);
        },
        [setData]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(data);
        resetForm();
    }


    return ( 
            <form onSubmit={handleSubmit} className="search-form">
                <input onChange={handleChange} placeholder="Фильм" name="film" value={data.film} className="search-form__input" type="search" required></input>
                <button className="search-form__button" type="submit"></button>
                <div className="search-form__checkbox-wrapper">
                    <FilterCheckbox onCheckboxClick={onCheckboxClick}/>
                    <p className="search-form__checkbox-text">Короткометражки</p>
                </div> 
            </form>   
    );
}

export default SearchForm;