const fse = require("fs-extra");
const parse5 = require("parse5");
const path = require("path");
const assert = require('assert');

function generateAbstractTree(node){
    assert(node);
    assert(node.tagName === 'svg');

    const viewBox = node.attrs.find(({ name }) => name === 'viewBox');
    assert(viewBox, "标签 svg 中不存在 viewBox 属性!");
}

async function run(){
    // 读取 SVG 矢量图片文件
    const svgPath = path.resolve(__dirname, "./webj2ee.svg");
    const svgData = await fse.readFile(svgPath, "utf8");

    // 使用 parse5 解析
    const docFragment = parse5.parseFragment(svgData);

    // 遍历
    generateAbstractTree(docFragment.childNodes[0]);
}

run();