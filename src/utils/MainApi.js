class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then(this._checkResponse);
    }

    updateUser({ name, email }, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ name, email }),
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const mainApi = new MainApi({
    baseUrl: "http://localhost:3005",
    //baseUrl: "https://mesto.lilya.nomoredomains.club",
});
