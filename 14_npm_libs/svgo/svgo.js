const fse = require('fs-extra');
const path = require('path');
const SVGO = require('svgo/svgo');
const parse5 = require("parse5");

// SVGO 插件控制参数
const options = {
    floatPrecision: 2,
    plugins: [
        { cleanupAttrs: true },
        { removeDoctype: true },
        { removeXMLProcInst: true },
        { removeXMLNS: false },
        { removeComments: true },
        { removeMetadata: true },
        { removeTitle: true },
        { removeDesc: true },
        { removeUselessDefs: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: true },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { removeViewBox: false },
        { cleanupEnableBackground: true },
        { convertStyleToAttrs: true },
        { convertColors: true },
        { convertPathData: true },
        { convertTransform: true },
        { removeUnknownsAndDefaults: true },
        { removeNonInheritableGroupAttrs: true },
        { removeUselessStrokeAndFill: true },
        { removeUnusedNS: true },
        { cleanupIDs: true },
        { cleanupNumericValues: true },
        { moveElemsAttrsToGroup: true },
        { moveGroupAttrsToElems: true },
        { collapseGroups: true },
        { removeRasterImages: false },
        { mergePaths: true },
        { convertShapeToPath: true },
        { sortAttrs: true },
        { removeDimensions: true },
        { removeAttrs: { attrs: ['class'] } }
    ]
};

async function beginOptimize(){
    const svgo = new SVGO(options);

    // 读取原始 SVG 文件
    const srcUrl = path.resolve(__dirname, "../source/webj2ee.svg");
    const srcData = await fse.readFile(srcUrl, 'utf8');

    // 优化 SVG
    const {data: dstData} = await svgo.optimize(srcData);

    // 解析 SVG DOM 结构
    const svgFragment  = parse5.parseFragment(dstData);
    const svgNode = svgFragment.childNodes[0];

    const oneLevelPathNodes = svgNode.childNodes.filter(
        ({ nodeName, childNodes }) =>
            nodeName !== 'style' && childNodes.length === 0
    );
    console.log(1, oneLevelPathNodes);


    // 输出优化后 SVG 文件
    const outputUrl = path.resolve(__dirname, "../output/webj2ee.svg");
    fse.outputFile(outputUrl, dstData)
}

beginOptimize();