import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
            <label className="checkbox">
                <input type="checkbox" className="checkbox__input"></input>
                <span className="checkbox__slider"></span>
            </label>
    );
}

export default FilterCheckbox;