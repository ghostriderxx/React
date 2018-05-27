import fetch from 'cross-fetch';

// ajax request
function request(url){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve([]);
        }, 3000);
    });
}