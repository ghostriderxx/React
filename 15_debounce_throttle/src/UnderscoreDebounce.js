var _ = function () {
};

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
//
// 用途：
//      模拟 ES6 的 rest parameter
//
// 示例:
//      const t = restArguments((p1, p2, p3, args) => {
//          console.log(Object.prototype.toString.call(args));
//          console.log(args.join(","));
//      });
//      t(1,2,3,4,5,6,7);
//
// 输出：
//      [object Array]
//      4,5,6,7
//
var restArguments = function (func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function () {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
            case 2:
                return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    };
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// 接口：
//      _.delay(function, wait, *arguments)
//
// 用途：
//      对 setTimeout 的包装
//
// 示例：
//      _.delay((p1, p2, p3) => {
//          console.log(p1, p2, p3);
//      }, 200, 1, 2, 3);
//
// 输出：
//      1 2 3
//
_.delay = restArguments(function (func, wait, args) {
    return setTimeout(function () {
        return func.apply(null, args);
    }, wait);
});


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function (func, wait, immediate) {
    /**
     * timeout 是定制器句柄，它表示：
     *
     * 1. timeout === null 时，代表之前的周期已正常结束，当前不处于周期中；
     * 2. timeout !== null 时，代表现在正处于一个周期过程中；
     */
    var timeout, result;

    /**
     * later 实际上担负两个职责（个人认为这也是可读性比较差的地方）：
     *
     * 1. immediate = false 时（即：trailing edge debouce）
     *
     *      later 负责：
     *          a. 指示一个周期已结束（清空 timeout 计时器变量）
     *          b. 执行用于定义的动作（func）
     *
     * 2. immediate = true 时（即：leading edge debounce）
     *      later 负责：
     *          a. 指示一个周期已结束（清空 timeout 计时器变量）
     */
    var later = function (context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function (args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            /**
             * immediate === true 即 leading edge debounce
             *
             *      即：新的一个周期开始的时候，执行动作；
             *
             *      a. timeout === null 时，代表之前的周期已经结束，即将开始一个新的周期；
             *      b. 周期结束后，通过 later 函数清空 timeout，指示周期结束；
             */
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = _.delay(later, wait, this, args);
        }

        return result;
    });

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

export default _;
