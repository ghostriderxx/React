import hello from "./hello"

hello();

if (module.hot) {

    module.hot.accept("./hello", function(){

        const reloadedHello = require("./hello");

        console.log(reloadedHello);

    });
}