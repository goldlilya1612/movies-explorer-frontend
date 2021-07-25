import "./Techs.css";

function Techs() {
    return (
        <section className="techs">
            <h2 className="section__title">Технологии</h2>
            <div className="techs__wrapper">
                <p className="techs__title">7 технологий</p>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="tech__links">
                <li className="tech__link-item">
                    <a className="tech__link" href="https://html.com/" target="_blank" rel="noopener noreferrer">HTML</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://www.w3.org/Style/CSS/" target="_blank" rel="noopener noreferrer">CSS</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://www.javascript.com/" target="_blank" rel="noopener noreferrer">JS</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express.js</a>
                </li>
                <li className="tech__link-item">
                    <a className="tech__link" href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">mongoDB</a>
                </li>
            </ul>

        </section>
    );
}

export default Techs;