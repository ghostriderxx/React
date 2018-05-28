import fetch from 'cross-fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

let id = 1;

let yzList = [{
    yzid: id++,
    kssj: "",
    yzms: "今日出院",
    zt: "录入",
    ksys: "系统管理员",
    zzys: "",
    kshs: "",
    zzhs: "",
    zzsj: "2020-01-01 00:00:00",
    shr: "",
    yzlx: "嘱托",
},{
    yzid: id++,
    kssj: "",
    yzms: "[2级护理]",
    zt: "录入",
    ksys: "系统管理员",
    zzys: "",
    kshs: "",
    zzhs: "",
    zzsj: "2020-01-01 00:00:00",
    shr: "",
    yzlx: "嘱托",
},{
    yzid: id++,
    kssj: "2018-05-14 08:58:09",
    yzms: "[0.9%氯化钠注射液,2];/po bid",
    zt: "审核",
    ksys: "系统管理员",
    zzys: "",
    kshs: "系统管理员",
    zzhs: "",
    zzsj: "2020-01-01 00:00:00",
    shr: "系统管理员",
    yzlx: "药品",
},];

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    // return fetch(url, options)
    //     .then(checkStatus)
    //     .then(parseJSON)
    //     .then(data => ({ data }))
    //     .catch(err => ({ err }));



    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(yzList);
        }, 2000);
    });

}
