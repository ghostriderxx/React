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
            resolve([{
                name: "张三",
                age: "39",
                address: "火锅城1号楼"
            }, {
                name: "李四",
                age: "25",
                address: "烧烤城2号楼"
            }]);
        }, 2000);
    });

}
