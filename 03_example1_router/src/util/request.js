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
    klsj: "2016-01-01 08:12:10",
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
    klsj: "2017-05-06 08:12:10",
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
    klsj: "2018-03-04 08:12:10",
    zzsj: "2020-01-01 00:00:00",
    shr: "系统管理员",
    yzlx: "药品",
},];


let sub2List = [{
    xmmc: "2级护理",
    sl: 1,
    hljb: "",
    dw: "次",
    gg: "",
    dj: 0,
    je: 0,
    zxks: "综合门诊",
    zfbl: 0,
    bz: "",
    jz: true,
}];

let sub3List = [{
    fz: "",
    fzbh: "",
    xmmc: "0.9%氯化钠注射液",
    gg: "",
    ycjl: 3,
    jldw: "",
    fysl: 0.09,
    dw: "袋",
    dj: 5.20,
    je: 0.47,
    xkc: 9796.91,
    zfbl: 0,
    ds: "",
    bz: "",
    jz: true,
}];



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
            if(url == "/yzMng/fetchYzList"){
                resolve(yzList);
            }else if(url == "/yzMng/fetchSub2List"){
                resolve(sub2List);
            }else if(url == "/yzMng/fetchSub3List"){
                resolve(sub3List);
            }
        }, 2000);
    });

}
