import "./AboutMe.css";
import studentPhoto from '../../images/student-photo.jpg'
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__wrapper">
                <img className="about-me__photo" src={studentPhoto} alt="Фото студента"></img>
                <div className="about-me__texts">
                    <p className="about-me__name">Лиля</p>
                    <p className="about-me__age">Фронтенд-разработчик, 19 лет</p>
                    <p className="about-me__text">Я долгое время жила в Беларуси, а потом поступила в МАИ на прикладную информатику и переехала в Москву. В данный момент обучаюсь на третьем курсе. Помимо веб-разработки занимаюсь творчеством: пишу музыку, пою и рисую. Также увлекаюсь фотографией и кино. </p>
                </div>
                <ul className="about-me__links">
                    <li className="about-me__link-item">
                        <a className="about-me__link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </li>
                    <li className="about-me__link-item">
                        <a className="about-me__link" href="https://github.com/goldlilya1612" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                </ul>
            </div>
            <Portfolio />
        </section>
    );
}

export default AboutMe;
