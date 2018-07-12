const DEFER_BEGIN = '@@RUI_DEFER/BEGIN';
const DEFER_END = '@@RUI_DEFER/END';
const NAMESPACE = '__RUI__DEFER__';

function createDefer(opts = {}) {
    const namespace = NAMESPACE;

    const initialState = {
        models: {},
    };

    const extraReducers = {
        [namespace](state = initialState, {type, payload}) {
            const {namespace} = payload || {};
            let ret;
            switch (type) {
                case DEFER_BEGIN:
                    ret = state;
                    break;
                case DEFER_END:
                    ret = {
                        ...state,
                        models: {
                            ...state.models, [namespace]: true
                        },
                    };
                    break;
                default:
                    ret = state;
                    break;
            }
            return ret;
        },
    };

    function onEffect(effect, {put, select}, model, actionType) {
        const {namespace} = model;
        if(`${namespace}/defer` == actionType){
            return function* (...args) {
                const deferred = yield select((state) => state[NAMESPACE].models[namespace]);
                if(!deferred){
                    yield put({type: DEFER_BEGIN, payload: {namespace}});
                    yield effect(...args);
                    yield put({type: DEFER_END, payload: {namespace}});
                }
            };
        }else {
            return effect;
        }
    }

    return {
        extraReducers,
        onEffect,
    };
}

export default createDefer;
