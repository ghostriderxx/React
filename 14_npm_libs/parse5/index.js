const fse = require("fs-extra");
const parse5 = require("parse5");
const path = require("path");
const assert = require('assert');

/**
 * AbstractNode：
 *
 *  export interface AbstractNode {
 *      tag: string;
 *      attrs: {
 *          [key: string]: string;
 *      };
 *      children?: AbstractNode[];
 *  }
 *
 */
function normalizeNode(node){
    // 分离 tagName
    const tag = node.tagName;
    if (!tag) {
        throw new TypeError(`Element should have no no-tag node`);
    }

    // 分离 attrs
    const attrs = node.attrs.reduce((acc, { name, value }) => {
        Object.defineProperty(acc, name, { value, enumerable: true });
        return acc;
    }, {});

    // 分离 childNodes
    const children = node.childNodes.map((child) =>
        normalizeNode(child)
    );
    const result = {
        tag,
        attrs
    };
    if (children.length) {
        result.children = children;
    }
    return result;
}

function generateAbstractTree(node){
    // 要求函数入参为 svg 节点
    assert(node.tagName === 'svg');

    // svg 节点必须包含 viewBox 属性
    const viewBox = node.attrs.find(({ name }) => name === 'viewBox');
    assert(viewBox, "svg 节点中必须包含 viewBox 属性!");

    // viewBox 属性值必须满足 x y width height 格式
    const size =  viewBox.value
        .split(' ')
        .slice(2)
        .map((str) => Number.parseInt(str, 10));
    assert(
        size.length === 2,
        `The size tuple should be [ width, height ], but got [ ${size[0]}, ${
            size[1]
            } ]`
    );

    // svg 下至多能存在一个 path 子节点
    const oneLevelPathNodes = node.childNodes.filter(
        ({ nodeName, childNodes }) =>
            nodeName !== 'style' && childNodes.length === 0
    );
    assert(oneLevelPathNodes.length >= 1, "svg 下至多能存在一个 path 子节点");

    // 转换为 AbstractNode
    return normalizeNode(node);
}

async function run(){
    // 读取 SVG 矢量图片文件
    const svgPath = path.resolve(__dirname, "./webj2ee.svg");
    const svgData = await fse.readFile(svgPath, "utf8");

    // 使用 parse5 解析
    const docFragment = parse5.parseFragment(svgData);

    // 遍历
    const tree = generateAbstractTree(docFragment.childNodes[0]);
    console.log(JSON.stringify(tree));
}

run();