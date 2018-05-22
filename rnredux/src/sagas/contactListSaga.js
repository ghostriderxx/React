
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// api
function fetch(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            let contacts = [];
            for(let i=0; i<5; i++){
                contacts = [
                    ...contacts,
                    ...[{
                        empno: `ZHANGSAN${i}`,
                        xm: `张三${i}`,
                        email: "zhangsan@dareway.com.cn",
                        phone: "13546884411",
                        department: "通用软件",
                    },{
                        empno: `LISI${i}`,
                        xm: `李四${i}`,
                        email: "lisi@dareway.com.cn",
                        phone: "10523884411",
                        department: "集成8部",
                    },{
                        empno: `WANGWU${i}`,
                        xm: `王五${i}`,
                        email: "wangwu@dareway.com.cn",
                        phone: "20523884411",
                        department: "人社9部",
                    },{
                        empno: `ZHAOLIU${i}`,
                        xm: `赵六${i}`,
                        email: `zhaoliu@dareway.com.cn${i}`,
                        phone: `30523884411${i}`,
                        department: "社研6部",
                    },{
                        empno: `WUQI${i}`,
                        xm: `吴七${i}`,
                        email: "wuqi@dareway.com.cn",
                        phone: "40523884411",
                        department: "外星3部",
                    },]
                ];
            }
            resolve(contacts);
        }, 3000);
    });
}

// worker Saga
function* fetchContactList(action) {
    try {
        yield put({type: "FETCH_CONTACTLIST_INPROGRESS"});

        const contactList = yield call(fetch);

        yield put({type: "FETCH_CONTACTLIST_SUCCESS", payload: contactList});
    } catch (e) {
        yield put({type: "FETCH_CONTACTLIST_FAILED", payload: e.message});
    }
}

function* contactListSaga() {
    yield takeLatest("FETCH_CONTACTLIST_REQUESTED", fetchContactList);
}

export default contactListSaga;