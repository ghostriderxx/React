import globby from 'globby';
import _ from 'lodash';
import path from 'path';
import { log } from '../../utils';
import { normalizeNamesFromDir } from './helpers';

const folderNames = ['fill', 'outline', 'twotone'];
export async function normalize(env) {
    for (const folderName of folderNames) {
        const dir = path.join(env.paths.SVG_DIR, folderName);
        await normalizeNamesFromDir(dir);
        log.notice(`Normalize ${dir}`);
    }
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
