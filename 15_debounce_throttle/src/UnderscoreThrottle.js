const _ = function(){};

// A (possibly faster) way to get the current timestamp as an integer.
_.now = Date.now || function() {
    return new Date().getTime();
};

// Creates and returns a new, throttled version of the passed function,
// that, when invoked repeatedly, will only actually call the original
// function at most once per every wait milliseconds.Useful for rate-limiting
// events that occur faster than you can keep up with.
//
// By default, throttle will execute the function as soon as you call it
// for the first time, and, if you call it again any number of times during
// the wait period, as soon as that period is over. If you'd like to disable
// the leading-edge call, pass {leading: false}, and if you'd like to disable
// the execution on the trailing-edge, pass {trailing: false}.
//
_.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = _.now();

        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);

        // 每次被调用时，都将“调用上下文（this）”、“调用参数（arguments）” 存下来，
        //
        // 注：trailing edge 的定时器只于周期内的第二次调用时设置、于周期结束时触发，
        //    但最终触发的应该是周期内的最后一次调用。这里始终记录的是周期内最后一次调用
        //    的“调用上下文”和“调用参数”；
        context = this;
        args = arguments;

        // remaining = wait - (now - previous);
        //
        //        0        wait
        //        |          |
        // ................................
        //
        // 1. remaining <=0，说明本次调用已超出 wait 周期外，立即执行；
        // 2. remaining > wait，即 now < previous，可能客户端时钟被调过，立即执行；
        // 3. 0 < remaining <= wait 时，说明本次调用仍处于 wait 周期内，不需要执行；
        //
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            //
            //     |<-----------wait----------->|
            //     |                            |
            // ----|--------|----|--------|-----|-----------
            //     |        | saveArgs saveArgs ^
            //     |        |                   |
            //     |        ---------------------
            //    执行   设置定时器       执行最后一次在周期内的调用
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};

console.log("begin");
const x = _.throttle((a, b)=>{
    console.log(a, b);
}, 3000);
x(1,2);
x(2,3);
x(3,4);
x(4,5);
x(5,6);
x(6,7);


export default _;
