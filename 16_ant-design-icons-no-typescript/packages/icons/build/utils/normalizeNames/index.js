import globby from 'globby';
import _ from 'lodash';
import path from 'path';
import { log } from '../../utils';
import { normalizeNamesFromDir } from './helpers';

const folderNames = ['fill', 'outline', 'twotone'];
export async function normalize(env) {

    /**
     * 修正以下目录中的 svg 文件的文件名：
     *      1. svg/fill
     *      2. svg/outline
     *      3. svg/twotone
     * 
     * 修正规则：
     *      1. 删除 -o 后缀;
     *      2. 删除 -fill 后缀;
     *      3. 删除 -twotone 后缀;
     *      4. 按映射规则调整一部分 svg 文件的文件名;
     *             build/constants.js
     */
    for (const folderName of folderNames) {
        const dir = path.join(env.paths.SVG_DIR, folderName);
        await normalizeNamesFromDir(dir);
        log.notice(`Normalize ${dir}`);
    }

    /**
     * 将以下目录： 
     *      svg/fill
     *      svg/outline
     *      svg/twotone 
     * 中所有 svg 文件的文件名
     * 去除扩展名、去重、汇总
     */
    const listNames = _.uniq(
        _.flatten(
            await Promise.all(
                ['fill', 'outline', 'twotone'].map((theme) => {
                    return globby(['*.svg'], {
                        cwd: path.join(env.paths.SVG_DIR, theme),
                        deep: false
                    });
                })
            )
        )
    ).map((name) => name.replace(/\.svg$/, ''));
    return listNames;
}
