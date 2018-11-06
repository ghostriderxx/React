export default function RookieThrottle(func, wait){
    let lastTime = Date.now();

    return function(...args){
        const currentTime = Date.now();
        if(currentTime - lastTime < wait){
            return;
        }
        lastTime = Date.now();
        func(...args);
    }
}
