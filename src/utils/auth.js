//export const BASE_URL = "https://api.diploma.nomoredomains.work";
export const BASE_URL = "http://localhost:3005";

export const register = ({ email, password, name }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
    }).then((res) => checkResponse(res));
};

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
