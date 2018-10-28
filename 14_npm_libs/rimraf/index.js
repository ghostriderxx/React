const rimraf = require("rimraf");
const path = require("path");

function delTmp(){
    const tmpPath = path.resolve(__dirname, "./tmp/");

    new Promise((resolve) => rimraf(tmpPath, resolve)).then(()=>{
        console.log(`Del ${tmpPath} success!`);
    });
}

delTmp();