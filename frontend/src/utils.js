import {ACCESS_TOKEN, ROLE, USER_ID} from "./constants";

export const LOGIN_CHANGED = 'login_changed';
export const PAGE_CHANGED = 'page_changed';

export const Session = {

    isLoggedIn: () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        return token !== null;
    },

    login: (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        // window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    },

    logout: () => {
        localStorage.clear();
     //   window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    },

    isOwner: () => {
        const role = localStorage.getItem(ROLE);
        if(role)
            return role.includes("ROLE_OWNER");
        else return false;
    },

    isAdmin: () => {
        const role = localStorage.getItem(ROLE);
        if(role)
            return role.includes("ROLE_ADMIN");
        else return false;
    },

    userId: () => {
        return localStorage.getItem(USER_ID);
    }

};