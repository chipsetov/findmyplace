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
                // if (!response.ok) {
                //     return Promise.reject(json);
                // }
                return json;
            })
        );
};

export const deleteRequest = (options) => {
    const headers = new Headers();

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', TOKEN_TYPE + " " + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            return response;
        }).catch(error => error);
};

export const uploadFileRequest = (options) => {
    const headers = new Headers();

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', TOKEN_TYPE + " " + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};

    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
                return response;
        })
};

export function setUserAvatar(avatarImage) {
    const formData = new FormData();
    formData.append('file', avatarImage, 'a.png');
    return uploadFileRequest({
        url: API_BASE_URL + '/set-avatar',
        method: 'POST',
        body: formData
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function getApprovePlaces(loginRequest) {
    return request({
        url: API_BASE_URL + "/places/not-approved",
        method: 'GET',
    });
}

export function rejectPlace(rejectPlaceRequest) {
    return request({
        url: API_BASE_URL + "/places/reject",
        method: 'POST',
        body: JSON.stringify(rejectPlaceRequest)
    })

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

export const getProfile = (nickname) => request({
    url: API_BASE_URL + `/users/nick/${nickname}`,
    method: 'GET'
});


export const approvePlace = (id) => request({
    url: API_BASE_URL + `/places/approve/${id}`,
    method: 'PUT'
});

export const updateProfile = profile => request({
    url: API_BASE_URL + "/users/update",
    method: 'POST',
    body: JSON.stringify(profile)
});

export const getAvatar = () => request({
    url: API_BASE_URL + '/get-avatar',
    method: 'GET'
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

