import "./Footer.css";

function Footer() {
    return (
        <section className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <nav className="footer__nav">
                <ul className="footer__links">
                    <li className="footer__link-item">
                        <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link-item">
                        <a className="footer__link" href="https://github.com/yandex-praktikum" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                    <li className="footer__link-item">
                        <a className="footer__link" href="https://www.facebook.com/yandex.praktikum" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </li>
                </ul>
            </nav>
            <p className="footer__year">© 2020</p>
        </section>
    );
}

export default Footer;
