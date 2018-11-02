const fse = require('fs-extra');
const path = require('path');
const SVGO = require('svgo');

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
    const sourcePath = path.resolve(__dirname, "./source/webj2ee.svg");
    const sourceData = await fse.readFile(sourcePath, 'utf8');

    // 优化 SVG
    const {data} = await svgo.optimize(sourceData);

    // 输出优化后 SVG 文件
    const destPath = path.resolve(__dirname, "./dest/webj2ee.svg");
    fse.writeFile(destPath, data, "utf8")
}

beginOptimize();