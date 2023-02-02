import "./FilterCheckbox.css";

function FilterCheckbox({ onCheckboxClick }) {

    const handleCheckboxClick = (e) => {
        const checkbox = e.target;
        onCheckboxClick(checkbox.checked);
    }

    return (
            <label className="checkbox">
                <input type="checkbox" className="checkbox__input" onChange={handleCheckboxClick}></input>
                <span className="checkbox__slider"></span>
            </label>
    );
}

export default FilterCheckbox;