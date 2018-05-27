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

let userList = [{
    empno: id++,
    name: "张三",
    age: "39",
    address: "火锅城1号楼"
}, {
    empno: id++,
    name: "李四",
    age: "25",
    address: "烧烤城2号楼"
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
            if(url == "/userMng/addUser"){
                userList.push({
                    empno: id++,
                    ...options
                });
            }else if(url == "/userMng/deleteUser"){
                userList = userList.filter((user)=>{
                    return user.empno != options.empno
                });
            }
            resolve(userList);
        }, 2000);
    });

}
