import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="section__title">О проекте</h2>
            <div className="about-project__texts-container">
                <div className="about-project__texts">
                    <h3 className="about-project__text-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div> 
                <div className="about-project__texts">
                    <h3 className="about-project__text-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div> 

            <div className="about-project__scales">
                <div className="about-project__scale about-project__scale_backend">
                    <p className="about-project__duration about-project__duration_backend">1 неделя</p>
                    <p className="about-project__stage about-project__stage_backend">back-end</p>
                </div>
                <div className="about-project__scale about-project__scale_frontend">
                    <p className="about-project__duration about-project__duration_frontend">4 недели</p>
                    <p className="about-project__stage about-project__stage_frontend">front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;