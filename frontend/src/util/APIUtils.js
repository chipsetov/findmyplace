import {API_BASE_URL, ACCESS_TOKEN, TOKEN_TYPE} from '../constants';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', TOKEN_TYPE + " " + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                     return Promise.reject(json);
                }
                return json;
            })
        );
};

export const deleteRequest = (options) => {
    const headers = new Headers();

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', TOKEN_TYPE + " " + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            return response;
        }).catch(error => error);
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function resendEmail(usernameOrEmail) {
    return request({
        url: API_BASE_URL + "/auth/resendEmail?usernameOrEmail=" + usernameOrEmail,
        method: 'GET',
    });
}

export function forgotPassword(forgotRequest) {
    return request({
        url: API_BASE_URL + "/auth/forgotPassword",
        method: 'POST',
        body: JSON.stringify(forgotRequest)
    });
}

export function restorePassword(restoreRequest) {
    return request({
        url: API_BASE_URL + "/auth/restore/"+this.props.match.params.token,
        method: 'POST',
        body: JSON.stringify(restoreRequest)
    });
}

export const getProfile = (nickname) => request({
    url: API_BASE_URL + `/users/nick/${nickname}`,
    method: 'GET'
});

export const updateProfile = profile => request({
    url: API_BASE_URL + "/users/update",
    method: 'POST',
    body: JSON.stringify(profile)
});

export function filterPlace(filterRequest) {
    return request({
        url: API_BASE_URL + "/map/filter",
        method: 'POST',
        body: JSON.stringify(filterRequest)
    });
}

export function searchPlace(searchRequest) {
    return request({
        url: API_BASE_URL + "/map/search",
        method: 'POST',
        body: JSON.stringify(searchRequest)
    });
}

export function showAllPlaces() {
    return request({
        url: API_BASE_URL + "/map/all",
        method: 'POST',
    });
}

export function registerPlace(registerPlaceRequest) {
    return request({
        url: API_BASE_URL + "/places/register",
        method: 'POST',
        body: JSON.stringify(registerPlaceRequest)
    });
}

export function checkUserAvailability(username, email) {
    return request({
        url: API_BASE_URL + "/auth/checkUserAvailability?username=" + username + "&email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function deleteUserPlace(id) {
    return deleteRequest({
        url: API_BASE_URL + '/user/delete-place/' + id,
        method: 'DELETE'
    });
}

