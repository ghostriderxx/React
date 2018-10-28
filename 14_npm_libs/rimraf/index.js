const rimraf = require("rimraf");
const glob = require("glob");
const path = require("path");
const chalk = require("chalk");

// 包装 rimraf 为 Promise 模式，方便使用
function del(path){
    return new Promise((resolve) => rimraf(path, ()=>resolve(path)));
}

// 包装 glob 为 Promise 模式，方便使用
function dir(pattern){
    return new Promise((resolve, reject) => {
        glob(pattern, {
            cwd: path.resolve(__dirname)
        }, function(err, matches){
            resolve(matches);
        });
    });
}

dir("./tmp/*").then((matches)=>{
    return Promise.all(matches.map((match) => {

        const pathToDelete = path.resolve(__dirname, match);

        return del(pathToDelete);
    }));
}).then((files)=>{
    console.log(chalk.red.bold(`${files.join(",")} deleted!`));
});