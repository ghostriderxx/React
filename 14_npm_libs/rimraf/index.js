const rimraf = require("rimraf");
const glob = require("glob");
const globby = require("globby");
const path = require("path");
const chalk = require("chalk");

// 包装 rimraf 为 Promise 模式，方便使用
function del(path) {
    return new Promise((resolve) => rimraf(path, () => resolve(path)));
}

function log(files) {
    console.log(chalk.red.bold(`Files:

${files.join("\n")}

deleted!`));
}

/////////////////////////////////////////////////////////////////////
// Version1: 使用基础版 glob
//
function dir(pattern) {
    return new Promise((resolve, reject) => {
        glob(pattern, {
            cwd: path.resolve(__dirname)
        }, function (err, matches) {
            resolve(matches);
        });
    });
}

dir("./tmp/*").then((matches) => {
    return Promise.all(matches.map((match) => del(path.resolve(__dirname, match))));
}).then((files) => log(files));

/////////////////////////////////////////////////////////////////////
// Version2: 使用增强版 globby
//
globby("./tmp/*", {
    cwd: path.resolve(__dirname)
}).then((matches) => {
    return Promise.all(matches.map((match) => del(path.resolve(__dirname, match))));
}).then((files) => log(files));