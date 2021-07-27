import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__link-item">
                    <a className="portfolio__link" href="https://github.com/goldlilya1612/how-to-learn" target="_blank" rel="noopener noreferrer">Статичный сайт</a>
                    <p className="portfolio__arrow">↗</p>
                </li>
                <li className="portfolio__link-item">
                    <a className="portfolio__link" href="https://goldlilya1612.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
                    <p className="portfolio__arrow">↗</p>
                </li>
                <li className="portfolio__link-item">
                    <a className="portfolio__link" href="https://goldlilya1612.github.io/mesto/" target="_blank" rel="noopener noreferrer">Одностраничный сайт</a>
                    <p className="portfolio__arrow">↗</p>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;