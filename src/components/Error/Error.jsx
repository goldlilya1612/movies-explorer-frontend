import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
    return (
        <section className="error">
            <div className="error-container">
                <h3 className="error__code">404</h3>
                <p className="error__message">Страница не найдена</p>
            </div>
            <Link className="error__link">Назад</Link>
        </section>
    );
}

export default Error;