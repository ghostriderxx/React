import fetch from 'cross-fetch';

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(`${response.status} ${response.statusText} ${response.url}`);
}

function checkFrameworkException(data){
    if(data && data.__framework__error__ && data.__framework__error__type == 1){
        const error = new Error(data.__framework__error__message);
        error.errortype = 1;
        throw error;
    }else if(data && data.__framework__error__ && data.__framework__error__type == 2){

        const error = new Error(data.__framework__error__message);
        error.errortype = 2;
        throw error;
    }
    return data;
}

export default function request(url, options) {
    return fetch(url, options)
        .then(checkHttpStatus)
        .then(response => response.json())
        .then(checkFrameworkException)
        .then(({payload}) => payload)
}
