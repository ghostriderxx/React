import {uuid} from "../../util"

export default {

    namespace: 'lane',

    state: {
        lanes: [],
        mainLaneId: null,
        currentActiveLaneId: null,
        loading: false,
    },

    effects: {
        * addLane({payload}, {call, put}) {
            yield put({
                type: `addLaneSuccess`,
                payload,
            });
        },

        * removeLane({payload}, {call, put}) {
            yield put({
                type: `removeLaneSuccess`,
                payload,
            });
        },

        * setMainLane({payload}, {call, put}) {
            const mainBeaconComponent = payload;
            const mainLaneId = `mainlane_${uuid()}`;

            // 1. Add Lane
            yield put({
                type: `addLane`,
                payload: mainLaneId,
            });

            // 2. Set Main Lane
            yield put({
                type: `setMainLaneSuccess`,
                payload: mainLaneId,
            });

            // 3. Active Main Lane
            yield put({
                type: `setActiveLaneSuccess`,
                payload: mainLaneId,
            });

            // 4. openBeaon
            yield put({
                type: `openBeaconSuccess`,
                payload: mainBeaconComponent,
            });
        },

        * openRes({payload}, {call, put}) {
            yield put({
                type: `openResSuccess`,
                payload,
            });
        },

        * closeRes({payload}, {call, put}) {
            yield put({
                type: `closeResSuccess`,
                payload,
            });
        },
    },

    reducers: {
        openBeaconSuccess(state, action) {
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, bcn:[...lane.bcn, action.payload]}:
                        lane;
                })
            };
        },

        openResSuccess(state, action) {
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, res:[...lane.res, action.payload]}:
                        lane;
                })
            };
        },

        closeResSuccess(state, action) {
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, res:[...lane.res.slice(0,-1)]}: lane;
                })
            };
        },

        addLaneSuccess(state, {payload}) {

            return {
                ...state,
                lanes:[
                    ...state.lanes,
                    {
                        id: payload,
                        res: [],
                        bcn: [],
                    }
                ]
            };
        },


        removeLaneSuccess(state, {payload}) {
            return {
                ...state,
                lanes: state.lanes.filter(lane => lane.id != payload),
                currentActiveLaneId: state.currentActiveLaneId == payload ? "mainLane" : state.currentActiveLaneId,
            };
        },

        setActiveLaneSuccess(state, {payload}) {
            return {
                ...state,
                currentActiveLaneId: payload
            };
        },

        setMainLaneSuccess(state, {payload}) {
            return {
                ...state,
                mainLaneId: payload,
            };
        },
    },

};