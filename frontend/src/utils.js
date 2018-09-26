import {ACCESS_TOKEN, ROLE} from "./constants";

export const emailValidation = email => /\S+@\S+\.\S+/.test(email);

export const LOGIN_CHANGED = 'login_changed';
export const PAGE_CHANGED = 'page_changed';

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
        localStorage.clear();
        window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    },

    isOwner: () => {
        const role = localStorage.getItem(ROLE);
        console.log(role);
        return role.includes("ROLE_OWNER");
    }

};