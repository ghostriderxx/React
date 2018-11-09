import path from 'path';

export const environment = {
    paths: {
        SVG_DIR: path.resolve(__dirname, '../svg'),
        ICON_TEMPLATE: path.resolve(__dirname, './templates/icon.js.template'),
        INDEX_TEMPLATE: path.resolve(__dirname, './templates/index.js.template'),
        MANIFEST_TEMPLATE: path.resolve(__dirname, './templates/manifest.js.template'),
        ICON_OUTPUT_DIR: path.resolve(__dirname, '../src/'),
        THEME_FILL_OUTPUT: path.resolve(__dirname, '../src/fill/*.js'),
        THEME_OUTLINE_OUTPUT: path.resolve(__dirname, '../src/outline/*.js'),
        THEME_TWO_TONE_OUTPUT: path.resolve(__dirname, '../src/twotone/*.js'),
        INDEX_OUTPUT: path.resolve(__dirname, '../src/index.js'),
        MANIFEST_OUTPUT: path.resolve(__dirname, '../src/manifest.js'),
        DIST_TEMPLATE: path.resolve(__dirname, './templates/dist.js.template'),
        DIST_OUTPUT: path.resolve(__dirname, '../src/dist.js'),
        // TYPES_TEMPLATE: path.resolve(__dirname, './templates/types.js'),
        // TYPES_OUTPUT: path.resolve(__dirname, '../src/types.js'),
        HELPERS_TEMPLATE: path.resolve(__dirname, './templates/helpers.js'),
        HELPERS_OUTPUT: path.resolve(__dirname, '../src/helpers.js'),
        INLINE_SVG_OUTPUT_DIR: path.resolve(__dirname, '../inline-svg/'),
        INLINE_SVG_THEME_FILL_OUTPUT: path.resolve(__dirname, '../inline-svg/fill/*.svg'),
        INLINE_SVG_THEME_OUTLINE_OUTPUT: path.resolve(__dirname, '../inline-svg/outline/*.svg'),
        INLINE_SVG_THEME_TWO_TONE_OUTPUT: path.resolve(__dirname, '../inline-svg/twotone/*.svg')
    },
    base: path.resolve(__dirname, '../'),
    options: {
        // SVGO Options
        // refer from @material-ui/icons
        // https://github.com/mui-org/material-ui/blob/master/packages/material-ui-icons/builder.js#L18
        svgo: {
            floatPrecision: 2,
            plugins: [
                { cleanupAttrs: true },
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeXMLNS: true },
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
        },
        prettier: {
            parser: 'babylon',
            singleQuote: true
        }
    }
};
