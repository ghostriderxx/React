import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import uuid from "../../util/UUID"

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "lane";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    lanes: [],
    mainLaneId: null,
    currentActiveLaneId: null,
    loading: false,
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function laneReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        /////////////////////////////////////////////////////////////////////////////////////////
        // Beacon的激活与删除

        // openBeacon
        case `${namespace}/OPEN_BEACON_SUCCESS`:
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, bcn:[...lane.bcn, action.payload]}:
                        lane;
                })
            };

        /////////////////////////////////////////////////////////////////////////////////////////
        // RES的激活与删除

        // openRES
        case `${namespace}/OPEN_RES_SUCCESS`:
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, res:[...lane.res, action.payload]}:
                        lane;
                })
            };


        // closeRES
        case `${namespace}/CLOSE_RES_SUCCESS`:
            return {
                ...state,
                lanes: state.lanes.map(lane => {
                    return lane.id == state.currentActiveLaneId ? {...lane, res:[...lane.res.slice(0,-1)]}: lane;
                })
            };


        /////////////////////////////////////////////////////////////////////////////////////////
        // Lane 的增、删、激活

        // addLane
        case `${namespace}/ADD_LANE_SUCCESS`:
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

        // removeLane
        case `${namespace}/REMOVE_LANE_SUCCESS`:
            return {
                ...state,
                lanes: state.lanes.filter(lane => lane.id != payload),
                currentActiveLaneId: state.currentActiveLaneId == payload ? "mainLane" : state.currentActiveLaneId,
            };

        // setLaneActive
        case `${namespace}/SET_ACTIVE_LANE_SUCCESS`:
            return {
                ...state,
                currentActiveLaneId: payload
            };

        // setMainLaneActive
        case `${namespace}/SET_MAIN_LANE_SUCCESS`:
            return {
                ...state,
                mainLaneId: payload,
            };

        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
function* addLaneWatcher() {
    yield takeLatest(`${namespace}/ADD_LANE_REQUESTED`, function*(action) {
        yield put({
            type: `${namespace}/ADD_LANE_SUCCESS`,
            payload: action.payload,
        });
    });
}

function* removeLaneWatcher() {
    yield takeLatest(`${namespace}/ADD_LANE_REQUESTED`, function*(action) {
        yield put({
            type: `${namespace}/REMOVE_LANE_SUCCESS`,
            payload: action.payload,
        });
    });
}

function* setMainLaneWatcher() {
    yield takeLatest(`${namespace}/SET_MAIN_LANE_REQUESTED`, function*(action) {

        const mainBeaconComponent = action.payload;
        const mainLaneId = `mainlane_${uuid()}`;

        // 1. Add Lane
        yield put({
            type: `${namespace}/ADD_LANE_REQUESTED`,
            payload: mainLaneId,
        });

        // 2. Set Main Lane
        yield put({
            type: `${namespace}/SET_MAIN_LANE_SUCCESS`,
            payload: mainLaneId,
        });

        // 3. Active Main Lane
        yield put({
            type: `${namespace}/SET_ACTIVE_LANE_SUCCESS`,
            payload: mainLaneId,
        });

        // 4. openBeaon
        yield put({
            type: `${namespace}/OPEN_BEACON_SUCCESS`,
            payload: mainBeaconComponent,
        });
    });
}


function* laneSaga(){
    yield all([
        addLaneWatcher(),
        setMainLaneWatcher(),
    ]);
};


/////////////////////////////////////////////////////////////////////////////
// Export
//
const exports = {
    namespace,
    reducer: laneReducer,
    effect: laneSaga
};
export default exports;