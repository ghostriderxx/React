
export default function RookieDebounce(func, wait){
    let timerID = null;

    return function(){
        clearTimeout(timerID);
        timerID = setTimeout(func, wait);
    }
}
