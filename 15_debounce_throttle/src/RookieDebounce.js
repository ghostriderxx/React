
export default function RookieDebounce(func, wait) {
    let timerID = null;

    return function (...args) {
        clearTimeout(timerID);
        timerID = setTimeout(func, wait, ...args);
    }
}
