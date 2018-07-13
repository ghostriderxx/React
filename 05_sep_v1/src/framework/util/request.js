import fetch from 'cross-fetch';
import NetworkException from "../exception/NetworkException";
import BusinessException from "../exception/BusinessException";
import AppException from "../exception/AppException";
import URL from "./URL";

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

export default function request(urlInst) {
    if(!urlInst){
        throw new Error("request 入参 urlInst 为空，请检查!");
    }

    if( !(urlInst instanceof URL)){
        throw new Error("request 入参 urlInst 必须为 URL 类的实例，请检查!");
    }

    const reqUrl = urlInst.getUrl();
    const reqData = urlInst.getData();

    if(typeof reqData == "string"){

        return fetch(reqUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: reqData,
        }).then(checkHttpStatus)
            .then(response => response.json())
            .then(checkFrameworkException)
            .then(({payload}) => payload);

    }else if(reqData instanceof FormData){

        return fetch(reqUrl, {
            method: 'POST',
            body: reqData,
        }).then(checkHttpStatus)
            .then(response => response.json())
            .then(checkFrameworkException)
            .then(({payload}) => payload);

    }
}
