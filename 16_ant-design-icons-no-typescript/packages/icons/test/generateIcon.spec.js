import fs from 'fs-extra';
import path from 'path';
import { environment } from '../build/env';
import { build } from '../build/generateIcons';
import { Environment } from '../build/typings';

describe('build/generateIcon.js', () => {
    const env = {
        paths: {
            SVG_DIR: path.resolve(__dirname, './root/svg'),
            ICON_TEMPLATE: path.resolve(__dirname, '../build/templates/icon.js.template'),
            INDEX_TEMPLATE: path.resolve(__dirname, '../build/templates/index.js.template'),
            MANIFEST_TEMPLATE: path.resolve(__dirname, '../build/templates/manifest.js.template'),
            MANIFEST_OUTPUT: path.resolve(__dirname, './root/src/manifest.js'),
            ICON_OUTPUT_DIR: path.resolve(__dirname, './root/src/'),
            THEME_FILL_OUTPUT: path.resolve(__dirname, './root/src/fill/*.js'),
            THEME_OUTLINE_OUTPUT: path.resolve(__dirname, './root/src/outline/*.js'),
            THEME_TWO_TONE_OUTPUT: path.resolve(__dirname, './root/src/twotone/*.js'),
            INDEX_OUTPUT: path.resolve(__dirname, './root/src/index.js'),
            DIST_TEMPLATE: path.resolve(__dirname, '../build/templates/dist.js.template'),
            DIST_OUTPUT: path.resolve(__dirname, './root/src/dist.js'),
            TYPES_TEMPLATE: path.resolve(__dirname, '../build/templates/types.js'),
            TYPES_OUTPUT: path.resolve(__dirname, './root/src/types.js'),
            HELPERS_TEMPLATE: path.resolve(__dirname, '../build/templates/helpers.js'),
            HELPERS_OUTPUT: path.resolve(__dirname, './root/src/helpers.js'),
            INLINE_SVG_OUTPUT_DIR: path.resolve(__dirname, './root/inline-svg/'),
            INLINE_SVG_THEME_FILL_OUTPUT: path.resolve(__dirname, './root/inline-svg/fill/*.svg'),
            INLINE_SVG_THEME_OUTLINE_OUTPUT: path.resolve(__dirname, './root/inline-svg/outline/*.svg'),
            INLINE_SVG_THEME_TWO_TONE_OUTPUT: path.resolve(__dirname, './root/inline-svg/twotone/*.svg')
        },
        base: path.resolve(__dirname, './'),
        options: {
            svgo: environment.options.svgo,
            prettier: environment.options.prettier
        }
    };
    const closePath =
        'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7' +
        ' 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.' +
        '7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 8' +
        '24.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l' +
        '216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0' +
        ' 10.5-7.9 6.1-13.1L563.8 512z';
    it('should work.', async () => {
        await build(env);
        const outlineString = await fs.readFile(`${env.paths.ICON_OUTPUT_DIR}/outline/CloseOutline.js`, 'utf8');
        expect(outlineString).toContain(closePath);
    });
});
