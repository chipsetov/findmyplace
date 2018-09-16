import { API_BASE_URL, ACCESS_TOKEN } from 'constants';

export const emailValidation = email => /\S+@\S+\.\S+/.test(email);

export const LOGIN_CHANGED = 'login_changed';

export const Session = {

    isLoggedIn: () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        return token !== null;
    },

    login: (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    },

    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    }

};