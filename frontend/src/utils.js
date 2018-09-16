export const emailValidation = email => /\S+@\S+\.\S+/.test(email);

export const LOGIN_CHANGED = 'login_changed';
export const PAGE_CHANGED = 'page_changed';

export const Session = {

    isLoggedIn: () =>  {
        const token = localStorage.getItem('access_token');

        return token !== null;
    },

    login: (token) => {
        localStorage.setItem('access_token', token);
        window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    },

    logout: () => {
        localStorage.removeItem('access_token');
        window.dispatchEvent(new CustomEvent(LOGIN_CHANGED));
    }

};