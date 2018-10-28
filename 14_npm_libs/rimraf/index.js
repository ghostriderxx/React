const rimraf = require("rimraf");
const path = require("path");

function del(path){
    return new Promise((resolve) => rimraf(tmpPath, resolve));
}

const tmpPath = path.resolve(__dirname, "./tmp/");

del(tmpPath).then(()=>{
    console.log(`Del ${tmpPath} success!`);
});