import { Link } from "react-router-dom";
import "./ButtonBlock.css";


function ButtonBlock({ content, name, isValid, isDisabled}) {
    return (
        <div className={`section-with-form__wrapper section-with-form__wrapper_${name}`}>
            {
            isValid ? 
                isDisabled ? 
                    (<button disabled type="submit" className="section-with-form__button">{content.button}</button>):
                    (<button type="submit" className="section-with-form__button">{content.button}</button>):
            (<button type="submit" className="section-with-form__button section-with-form__button_invalid" disabled>{content.button}</button>)
            }
            <p className="section-with-form__text">{content.text}
                <Link to={content.path} className="section-with-form__text-link">{content.link}</Link>
            </p>
        </div>
    );
}

export default ButtonBlock;