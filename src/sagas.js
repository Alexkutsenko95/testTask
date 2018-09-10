import {call, put, takeEvery, fork} from 'redux-saga/effects'
import {fetchUsers, patchUsers, deleteUsers, postUser} from './actions/sagasActions'
import {
    FETCH_DATA, FETCH_DATA_SUCCESS, PATCH_DATA, PATCH_DATA_SUCCESS,
    POST_DATA, DELETE_DATA, DELETE_DATA_SUCCESS, POST_DATA_SUCCES
} from './actions/types';

function* fetchUserss() {
    const users = yield call(fetchUsers);
    yield put({type: FETCH_DATA_SUCCESS, payload: users});
}

function* patchUserss(action) {
    const users = yield call(patchUsers, action.payload);
    yield put({type: PATCH_DATA_SUCCESS, payload: users});
    yield put({
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
            method: "push",
            args: ["/"]
        }
    });
}

function* postUserss(action) {
    const users = yield call(postUser, action.payload);
    yield put({type: POST_DATA_SUCCES, payload: users});
    yield put({
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
            method: "push",
            args: ["/"]
        }
    });
}

function* deleteUserss(action) {
    yield call(deleteUsers, action.payload);
    yield put({type: DELETE_DATA_SUCCESS, payload: action.payload});
    yield put({
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
            method: "push",
            args: ["/"]
        }
    });
}

function* onFetchData() {
    yield takeEvery(FETCH_DATA, fetchUserss);
}

function* onPatchData() {
    yield takeEvery(PATCH_DATA, patchUserss);
}

function* onDeleteData() {
    yield takeEvery(DELETE_DATA, deleteUserss);
}

function* onPostData() {
    yield takeEvery(POST_DATA, postUserss);
}

function* mySaga() {
    yield fork(onFetchData);
    yield fork(onPatchData);
    yield fork(onDeleteData);
    yield fork(onPostData);
}

export default mySaga;