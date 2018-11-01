const path = require("path");
const fse = require("fs-extra");


// 1. 判定文件是否存在
const p1 = path.resolve(__dirname, "./file1.txt");
const p2 = path.resolve(__dirname, "./file2.txt");
fse.access(p1).then(()=>{
    console.log(`${p1} Exist!`);
}).catch(()=>{
    console.log(`${p1} Not Exist!`);
});
fse.access(p2).then(()=>{
    console.log(`${p2} Exist!`);
}).catch(()=>{
    console.log(`${p2} Not Exist!`);
});


// rename

// readFile

// writeFile

// access