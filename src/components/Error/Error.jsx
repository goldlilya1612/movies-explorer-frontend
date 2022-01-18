import "./Error.css";

function Error() {

    const handleButtonClick = () => {
        window.history.back();
    }

    return (
        <section className="error">
            <div className="error-container">
                <h3 className="error__code">404</h3>
                <p className="error__message">Страница не найдена</p>
            </div>
            <button onClick={handleButtonClick} className="error__button">Назад</button>
        </section>
    );
}

export default Error;