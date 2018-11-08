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
        // leadingEdge 靠 previous 来保证；
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = _.now();

        // 第一次执行回调（此时 previous 为 0，之后 previous 值为上一次时间戳）
        // 并且如果程序设定第一个回调不是立即执行的（options.leading === false）
        // 则将 previous 值（表示上次执行的时间戳）设为 now 的时间戳（第一次触发时）
        // 表示刚执行过，这次就不用执行了
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);

        // 每次调用都记录 context、args，即保持参数、this都是最新的；
        context = this;
        args = arguments;

        console.log(remaining, !timeout);

        // 时间轴上
        //        0        wait
        //        |          |
        // ................................
        if (remaining <= 0 || remaining > wait) {
            // a. <=0 超出时长
            // b. > wait 向前调过表
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            /**
             * 保持在一个周期最后的触发...
             * @type {number}
             */
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
