import fetch from 'cross-fetch';
import NetworkException from "../exception/NetworkException";
import BusinessException from "../exception/BusinessException";
import AppException from "../exception/AppException";

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new NetworkException(`${response.status} ${response.statusText} ${response.url}`);
}

function checkFrameworkException(data){
    if(data && data.__framework__error__ && data.__framework__error__type == 1){
        throw new BusinessException(data.__framework__error__message);
    }else if(data && data.__framework__error__ && data.__framework__error__type == 2){
        throw new AppException(data.__framework__error__message);
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
