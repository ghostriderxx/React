const rimraf = require("rimraf");
const path = require("path");

// 包装 rimraf 为 Promise 模式，方便使用
function del(path){
    return new Promise((resolve) => rimraf(path, resolve));
}

// 删除 tmp 目录下的所有文件
const tmpPath = path.resolve(__dirname, "./tmp/*");

del(tmpPath).then(()=>{
    console.log(`Del ${tmpPath} success!`);
});