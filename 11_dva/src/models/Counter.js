export default {
    namespace: 'counter',
    state: 0,
    reducers: {
        inc(state, {payload: id}) {
            return state + 1;
        },
        dec(state, {payload: id}) {
            return state - 1;
        },
    },
};