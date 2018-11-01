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

// 2. 重命名
const p3 = path.resolve(__dirname, "./file1.txt.bak");
fse.rename(p1, p3).then(()=>{
    console.log(`rename success: ${p1} ==> ${p3}`);
});

// 3. 读取文件
fse.readFile(p1, "utf8").then((data)=>{
    console.log(`\nData read from ${p1}:`);
    console.log(data);
    console.log(`\n`);
});

// 4. 写文件
const p4 = path.resolve(__dirname, "./file2.txt");