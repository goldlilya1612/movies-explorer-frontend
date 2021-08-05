const windowWidth = window.screen.width;

const MOBILE = windowWidth >= 320 && windowWidth <= 480;
const TABLET = windowWidth > 480 && windowWidth < 1280;
const COMPUTER = windowWidth >= 1280;

const REGISTER = {
    button: "Зарегистрироваться",
    text: "Уже зарегистрированы?",
    link: "Войти",
    path: "/signin",
};

const LOGIN = {
    button: "Войти",
    text: "Еще не зарегистрированы?",
    link: "Регистрация",
    path: "/signup",
};

export { LOGIN, REGISTER, MOBILE, TABLET, COMPUTER };
