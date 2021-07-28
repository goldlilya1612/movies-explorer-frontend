import { Link } from "react-router-dom";
import "./ButtonBlock.css";


function ButtonBlock({ content, name }) {
    return (
        <div className={`section-with-form__wrapper section-with-form__wrapper_${name}`}>
            <button type="submit" className="section-with-form__button">{content.button}</button>
            <p className="section-with-form__text">{content.text}
                <Link to={content.path} className="section-with-form__text-link">{content.link}</Link>
            </p>
        </div>
    );
}

export default ButtonBlock;