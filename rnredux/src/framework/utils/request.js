import fetch from 'cross-fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => data)
        .catch(err => ({err}));
}
