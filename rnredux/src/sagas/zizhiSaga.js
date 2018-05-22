import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// api
function fetch(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            let zizhiList = [{
                id: "001",
                type: "公司资质",
                zzmc: "外星飞船管理证书",
                rdrq: "2019.02.01",
                rddw: "人力资源与社会保障部",
                zsbh: "y-X1-99",
            },{
                id: "002",
                type: "公司资质",
                zzmc: "高新技术企业认定证书",
                rdrq: "2017.12.28",
                rddw: "山东省科学技术厅",
                zsbh: "XX203837241724",
            },{
                id: "003",
                type: "个人资质",
                zzmc: "系统集成项目管理工程师（软考中级）",
                rdrq: "2017.12.02",
                rddw: "人力资源与社会保障部、工业和信息化部",
                zsbh: "87813672245",
            }];
            resolve(zizhiList);
        }, 3000);
    });
}

// worker Saga
function* fetchZizhiList(action) {
    try {
        yield put({type: "FETCH_ZIZHILIST_INPROGRESS"});

        const zizhiList = yield call(fetch);

        yield put({type: "FETCH_ZIZHILIST_SUCCESS", payload: zizhiList});
    } catch (e) {
        yield put({type: "FETCH_ZIZHILIST_FAILED", payload: e.message});
    }
}

function* zizhiSaga() {
    yield takeLatest("FETCH_ZIZHILIST_REQUESTED", fetchZizhiList);
}

export default zizhiSaga;