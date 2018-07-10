import invariant from 'invariant';
import * as sagaEffects from 'redux-saga/lib/effects';
import warning from 'warning';
import {
    takeEveryHelper as takeEvery,
    takeLatestHelper as takeLatest,
    throttleHelper as throttle,
} from 'redux-saga/lib/internal/sagaHelpers';
import {NAMESPACE_SEP} from './constants';
import prefixType from './prefixType';
import {formValueSelector, getFormSyncErrors, getFormValues, initialize} from 'redux-form'

export default function getSaga(effects, model, onError, onEffect) {
    return function* () {
        for (const key in effects) {
            if (Object.prototype.hasOwnProperty.call(effects, key)) {
                const watcher = getWatcher(key, effects[key], model, onError, onEffect);
                const task = yield sagaEffects.fork(watcher);
                yield sagaEffects.fork(function* () {
                    yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
                    yield sagaEffects.cancel(task);
                });
            }
        }
    };
}

function getWatcher(key, _effect, model, onError, onEffect) {
    let effect = _effect;
    let type = 'takeEvery';
    let ms;

    if (Array.isArray(_effect)) {
        effect = _effect[0];
        const opts = _effect[1];
        if (opts && opts.type) {
            type = opts.type;
            if (type === 'throttle') {
                invariant(
                    opts.ms,
                    'app.start: opts.ms should be defined if type is throttle'
                );
                ms = opts.ms;
            }
        }
        invariant(
            ['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1,
            'app.start: effect type should be takeEvery, takeLatest, throttle or watcher'
        );
    }

    function noop() {
    }

    function* sagaWithCatch(...args) {
        const {__dva_resolve: resolve = noop, __dva_reject: reject = noop} =
            args.length > 0 ? args[0] : {};
        try {
            yield sagaEffects.put({type: `${key}${NAMESPACE_SEP}@@start`});
            const ret = yield effect(...args.concat(createEffects(model)));
            yield sagaEffects.put({type: `${key}${NAMESPACE_SEP}@@end`});
            resolve(ret);
        } catch (e) {
            onError(e);
            if (!e._dontReject) {
                reject(e);
            }
        }
    }

    const sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

    switch (type) {
        case 'watcher':
            return sagaWithCatch;
        case 'takeLatest':
            return function* () {
                yield takeLatest(key, sagaWithOnEffect);
            };
        case 'throttle':
            return function* () {
                yield throttle(ms, key, sagaWithOnEffect);
            };
        default:
            return function* () {
                yield takeEvery(key, sagaWithOnEffect);
            };
    }
}

function createEffects(model) {
    function assertAction(type, name) {
        invariant(type, 'dispatch: action should be a plain Object with type');
        warning(
            type.indexOf(`${model.namespace}${NAMESPACE_SEP}`) !== 0,
            `[${name}] ${type} should not be prefixed with namespace ${
                model.namespace
                }`
        );
    }

    function put(action) {
        const {type} = action;
        assertAction(type, 'sagaEffects.put');
        return sagaEffects.put({...action, type: prefixType(type, model)});
    }

    function take(type) {
        if (typeof type === 'string') {
            assertAction(type, 'sagaEffects.take');
            return sagaEffects.take(prefixType(type, model));
        } else {
            return sagaEffects.take(type);
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    //
    // 自定义函数 - begin
    //
    function invoke(type, payload) {
        return put({
            type,
            payload
        });
    }

    function* openRES(title, componentPath, width, height, params) {
        return yield yield invoke("lane/openRes", {
            componentPath,
            width,
            title,
            params
        });
    }

    function closeRES(params) {
        return invoke("lane/closeRes", params);
    }

    function getObject(name) {
        return {
            checkFormValues: function*() {
                const errors = yield sagaEffects.select((state)=>{
                    return getFormSyncErrors(name)(state);
                });

                let valid = true;
                for(const o in errors){
                    alert(errors[o]);
                    valid = false;
                    break;
                }

                return valid;
            },


            getFormValues: function*() {
                const values = yield sagaEffects.select((state)=>{
                    return getFormValues(name)(state);
                });

                return values;
            },

            fillData: function*(ds) {
                if(ds.length){
                    yield sagaEffects.put(initialize(name, ds[0]));
                }
            },
        };
    }
    //
    // 自定义函数 - end
    //
    /////////////////////////////////////////////////////////////////////////////

    return {...sagaEffects, put, take, invoke, openRES, closeRES, getObject};
}

function applyOnEffect(fns, effect, model, key) {
    for (const fn of fns) {
        effect = fn(effect, sagaEffects, model, key);
    }
    return effect;
}
