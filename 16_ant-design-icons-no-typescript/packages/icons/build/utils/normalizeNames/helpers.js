import fs from 'fs-extra';
import globby from 'globby';
import _ from 'lodash';
import path from 'path';
import { renameMapper } from '../../constants';

/**
 * 修正文件目录中的 svg 文件名
 * 
 * 1. 删除 -o 后缀;
 * 2. 删除 -fill 后缀;
 * 3. 删除 -twotone 后缀;
 * 4. 按映射规则调整一部分 svg 文件的文件名;
 */
export async function normalizeNamesFromDir(dir, outDir) {
    const rawNames = await globby(['*.svg'], { cwd: dir, deep: false });

    const beforeAndAfter = rawNames.map((fileNameWithExtension) => {
        const normalized =
            normalizeName(
                fileNameWithExtension
                    .replace(/\.svg$/, '')
                    .replace(/-o$/, '')
                    .replace(/-fill$/, '')
                    .replace(/-twotone$/, '')
            ) + '.svg';
        return {
            before: fileNameWithExtension,
            after: normalized
        };
    });
    
    return Promise.all(
        beforeAndAfter.map(({ before, after })=>{
            return fs.rename(path.join(dir, before), path.join(outDir || dir, after))
        })
    );
}

/**
 * 按映射规则调整一部分 svg 文件的文件名
 * 
 * 例：
 *      arrawsalt   -> arrows-alt
 *      time-circle -> clock-circle
 *      pay-cirlce  -> pay-circle
 *      yuan        -> pay-circle
 *      ....
 *  
 *  映射关系定义在 build/constants.js 中
 */
function normalizeName(fileName) {
    return manulRename(_.kebabCase(fileName));
}

function manulRename(kebabCaseName) {
    const result = renameMapper[kebabCaseName];
    if (result) {
        return result;
    }
    return kebabCaseName;
}
