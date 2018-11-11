import fs from 'fs-extra';
import _ from 'lodash';
import parse5 from 'parse5';
import path from 'path';
import Prettier from 'prettier';
import SVGO from 'svgo';

import {from, Observable, of, Subscription} from 'rxjs';
import {concat, filter, map, mergeMap, reduce} from 'rxjs/operators';

import {
    EXPORT_DEFAULT_COMPONENT_FROM_DIR,
    EXPORT_DEFAULT_MANIFEST,
    EXPORT_DIST,
    ICON_IDENTIFIER,
    ICON_JSON,
    NEW_VIEWBOX,
    NORMAL_VIEWBOX,
    oldIcons,
    THEME_FILL,
    THEME_OUTLINE,
    THEME_TWOTONE
} from './constants';

import {renderIconDefinitionToSVGElement} from './templates/helpers';
import {clear, generateAbstractTree, getIdentifier, isAccessable, log, replaceFillColor} from './utils';
import {normalize} from './utils/normalizeNames';

export async function build(env) {
    const svgo = new SVGO(env.options.svgo);
    const singleType = ['fill', 'outline'];
    const svgoForSingleIcon = new SVGO({
        ...env.options.svgo,
        plugins: [
            ...env.options.svgo.plugins,
            // single color should remove the `fill` attribute.
            {removeAttrs: {attrs: ['fill']}}
        ]
    });

    /**
     * 清理目录
     * src/fill/*.js
     * src/outline/*.js
     * src/twotone/*.js
     *
     * inline-svg/fill/*.js
     * inline-svg/outline/*.js
     * inline-svg/twotone/*.js
     *
     * src/dist.js
     * src/index.js
     * src/helpers.js
     * src/mainfest.js
     */
    await clear(env);

    /**
     * 获取 svg 目录中经修正后的所有 svg 文件的文件名
     * （去重、去扩展名）
     */
    const svgBasicNames = await normalize(env);

    /**
     * 获取所有 svg 文件的 BuildTimeIconMetaData
     * 
     * export interface BuildTimeIconMetaData {
     *      identifier: string;
     *      icon: IconDefinition;
     * }
     * 
     * export interface IconDefinition {
     *      name: string; // kebab-case-style
     *      theme: ThemeType;
     *      icon:
     *        | ((primaryColor, secondaryColor) => AbstractNode)
     *        | AbstractNode;
     * }
     * 
     * export interface AbstractNode {
     *      tag: string;
     *      attrs: {
     *          [key: string]: string;
     *      };
     *      children?: AbstractNode[];
     * }
     */
    const svgMetaDataWithTheme = await Promise.all(
        _.flatten(
            ['fill', 'outline', 'twotone'].map((theme) => {
                return svgBasicNames.map((kebabCaseName) => {
                    /**
                     * 输入：
                     *      kebabCaseName: account-book
                     *      theme: fill | outline | twotone
                     * 输出：
                     *      {
                     *          kebabCaseName: account-book,
                     *          identifier: AccountBookFill | AccountBookOutline | AccountBookTwoTone
                     *      }
                     */
                    const identifier = getIdentifier(_.upperFirst(_.camelCase(kebabCaseName)), theme);
                    return {kebabCaseName, identifier};
                }).filter(({kebabCaseName}) => {
                    return isAccessable(path.resolve(env.paths.SVG_DIR, theme, `${kebabCaseName}.svg`))
                }).map(async ({kebabCaseName, identifier}) => {
                    /**
                     * 输入：
                     *      {
                     *          kebabCaseName: account-book,
                     *          identifier: AccountBookFill,
                     *      }
                     * 输出：
                     *      {
                     *          identifier: AccountBookFill,
                     *          icon: {
                     *              name: account-book,
                     *              theme: fill,
                     *              icon: {
                     *                  tag: "svg",
                     *                  attrs: ...,
                     *                  children: ...,
                     *              }
                     *          }
                     *      }
                     */
                    const tryUrl = path.resolve(env.paths.SVG_DIR, theme, `${kebabCaseName}.svg`);
                    let optimizer = svgo;
                    if (singleType.includes(theme)) {
                        optimizer = svgoForSingleIcon;
                    }
                    const {data} = await optimizer.optimize(await fs.readFile(tryUrl, 'utf8'));
                    const icon = {
                        name: kebabCaseName,
                        theme,
                        icon: {
                            ...generateAbstractTree(parse5.parseFragment(data).childNodes[0], kebabCaseName)
                        }
                    };
                    return {identifier, icon};
                });
            })
        )
    );
    
    /**
     * 调整 BuildTimeIconMetaData 中的属性
     * 
     * 1. viewBox
     * 2. class
     * 3. fill
     */
    const buildTimeIconMetaData = svgMetaDataWithTheme.map(({identifier, icon}) => {
        icon = _.cloneDeep(icon);
        if (typeof icon.icon !== 'function') {
            if (!oldIcons.includes(icon.name)) {
                icon.icon.attrs.viewBox = '64 64 896 896';
            }
            if (icon.icon.attrs.class) {
                icon.icon.attrs = _.omit(icon.icon.attrs, ['class']);
            }
        }
        if (icon.theme === 'twotone') {
            if (typeof icon.icon !== 'function' && icon.icon.children) {
                icon.icon.children.forEach((pathElment) => {
                    pathElment.attrs.fill = pathElment.attrs.fill || '#333';
                });
            }
        }
        return {identifier, icon};
    });

    
    /**
     * 生成 inline-svg 的 WriteFileMetaData
     * 
     * export interface WriteFileMetaData {
     *      path: string;
     *      content: string;
     * }
     */
    const inlineSVGFiles = buildTimeIconMetaData.map(({icon}) => {
        return {
            path: path.resolve(env.paths.INLINE_SVG_OUTPUT_DIR, icon.theme, `./${icon.name}.svg`),
            content: renderIconDefinitionToSVGElement(icon)
        };
    });

    /**
     * 生成 src/icon/[theme]/ 下文件的 WriteFileMetaData
     */
    const iconTsTemplate = await fs.readFile(env.paths.ICON_TEMPLATE, 'utf8');
    const iconFiles$ = buildTimeIconMetaData.map(({identifier, icon}) => {
        return {
            identifier,
            theme: icon.theme,
            content:
                icon.theme === 'twotone'
                    ? Prettier.format(
                    iconTsTemplate
                        .replace(ICON_IDENTIFIER, identifier)
                        .replace(
                            ICON_JSON,
                            JSON.stringify({...icon, icon: 'FUNCTION'}).replace(
                                `"FUNCTION"`,
                                `function (primaryColor: string, secondaryColor: string) {` +
                                ` return ${replaceFillColor(JSON.stringify(icon.icon))};` +
                                ` }`
                            )
                        ),
                    {...env.options.prettier, parser: 'babylon'}
                    )
                    : Prettier.format(
                    iconTsTemplate
                        .replace(ICON_IDENTIFIER, identifier)
                        .replace(ICON_JSON, JSON.stringify(icon)),
                    env.options.prettier
                    )
        };
    }).map(({identifier, content, theme}) => ({
        path: path.resolve(env.paths.ICON_OUTPUT_DIR, theme, `./${identifier}.js`),
        content
    }));

    /**
     * 生成 src/index.js 的 WriteFileMetaData
     */
    const indexTsTemplate = await fs.readFile(env.paths.INDEX_TEMPLATE, 'utf8');
    const indexFileContent = svgMetaDataWithTheme.reduce(
        (acc, {identifier, icon}) =>
            acc + `export { default as ${identifier} } from './${icon.theme}/${identifier}';\n`,
        ''
    );
    const indexFile = {
        path: env.paths.INDEX_OUTPUT,
        content: Prettier.format(
            indexTsTemplate.replace(EXPORT_DEFAULT_COMPONENT_FROM_DIR, indexFileContent),
            env.options.prettier
        )
    };

    /**
     * 生成 src/manifest.js 的 WriteFileMetaData
     */
    const manifestTsTemplate = await fs.readFile(env.paths.MANIFEST_TEMPLATE, 'utf8');
    const manifestFileContent = ['fill', 'outline', 'twotone'].map((theme) => ({
        theme,
        names: svgBasicNames.filter((name) => isAccessable(path.resolve(env.paths.SVG_DIR, theme, `${name}.svg`)))
    })).reduce(
        (acc, {theme, names}) => {
            acc[theme] = names;
            return acc;
        },
        {fill: [], outline: [], twotone: []}
    );
    const manifestFile = {
        path: env.paths.MANIFEST_OUTPUT,
        content: Prettier.format(
            manifestTsTemplate.replace(EXPORT_DEFAULT_MANIFEST, `export default ${JSON.stringify(manifestFileContent)};`),
            env.options.prettier
        )
    };

    /**
     * 生成 src/dist.js 的 WriteFileMetaData
     */
    const distTsTemplate = await fs.readFile(env.paths.DIST_TEMPLATE, 'utf8');
    const distContent = buildTimeIconMetaData.map(({identifier, icon}) => {
        let content = '';
        if (icon.theme === 'twotone') {
            if (typeof icon.icon !== 'function') {
                const paths = (icon.icon.children || [])
                    .filter(({attrs}) => typeof attrs.d === 'string') // fix the <defs> element in the top level children
                    .map(({attrs}) => {
                        const {fill, d} = attrs;
                        if (fill && d) {
                            return `['${fill}', '${d}']`;
                        }
                        return `'${d}'`;
                    })
                    .join(',');
                content = Prettier.format(
                    `export const ${identifier} = ` +
                    `getIcon('${icon.name}', '${icon.theme}', ${replaceFillColor(
                        `function (primaryColor, secondaryColor) {` +
                        ` return getNode('${icon.icon.attrs.viewBox}', ${paths}) }`
                    )})`,
                    {...env.options.prettier, parser: 'babylon'}
                );
            }
        } else {
            if (typeof icon.icon !== 'function') {
                const paths = (icon.icon.children || [])
                    .filter(({attrs}) => typeof attrs.d === 'string')
                    .map(({attrs}) => {
                        const {fill, d} = attrs;
                        if (fill && d) {
                            return `['${fill}', '${d}']`;
                        }
                        return `'${d}'`;
                    })
                    .join(',');
                content = Prettier.format(
                    `export const ${identifier} = ` +
                    `getIcon('${icon.name}', '${icon.theme}', ` +
                    `getNode('${icon.icon.attrs.viewBox}', ${paths})` +
                    `);`,
                    env.options.prettier
                );
            }
        }
        content = content
            .replace(NORMAL_VIEWBOX, 'normalViewBox')
            .replace(NEW_VIEWBOX, 'newViewBox')
            .replace(THEME_FILL, 'fill')
            .replace(THEME_OUTLINE, 'outline')
            .replace(THEME_TWOTONE, 'twotone');
        return content;
    }).reduce((acc, nextContent) => acc + nextContent, '');
    const dist = {
        path: env.paths.DIST_OUTPUT,
        content: distTsTemplate.replace(EXPORT_DIST, distContent)
    };

    /**
     * 生成 src/helpers.js 的 WriteFileMetaData
     */
    const helpersTsTemplate = await fs.readFile(env.paths.HELPERS_TEMPLATE, 'utf8');
    const helpers = {
        path: env.paths.HELPERS_OUTPUT,
        content: helpersTsTemplate
    };

    /**
     * 批量写文件
     */
    return Promise.all(_.flatten([inlineSVGFiles, manifestFile, indexFile, dist, helpers]).map(async ({path: writeFilePath, content}) => {
        await fs.writeFile(writeFilePath, content, 'utf8');
        log.info(`Generated ./${path.relative(env.base, writeFilePath)}`);
    })).then(()=>{
        log.notice('Done.');
    });
}
