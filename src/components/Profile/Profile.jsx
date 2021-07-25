import "./Profile.css";

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile-form">
                <label className="profile-form__label profile-form__label_first " htmlFor="profile-name">Имя
                    <input type="text" id="profile-name" className="profile-form__input"></input>
                </label>
                <span className="profile__input-error">Увеличьте текст до 2 симв. или более (в настоящее время используется 1 символ).</span>
                <label className="profile-form__label" htmlFor="profile-email">E-mail
                    <input type="email" id="profile-email" className="profile-form__input"></input>
                </label>
            </form>
            <div className="profile__buttons">
                <button type="submit" className="profile__button profile__button_update">Редактировать</button>
                <button type="button" className="profile__button profile__button_get-out">Выйти из аккаунта</button>
            </div>
        </section>
    );
}

export default Profile;