import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchConfirm() {
  try {
    yield axios.get("/api/admin/confirm");
    const response = yield axios.get("/api/admin/history")
    console.log('response in fetchConfirm is', response)
    yield put({ type: "SET_HISTORY", payload: response.data });
    yield put({ type: "SET_ENTRY", payload: []});
    yield put({ type: "SET_CALCULATIONS", payload: []});
    yield put({ type: "SET_REDIRECT_HOME", payload: true});
    yield put({ type: "SET_REDIRECT_HOME", payload: false});
  } catch (error) {
    console.log("error fetch ", error);
  }
}

function* fetchHistory() {
    try {
        const response = yield axios.get("/api/admin/history")
        console.log('send info to history reducer', response)
        yield put({ type: "SET_HISTORY", payload: response.data });
    } catch (error) {
        console.log("problem with setting history", error)
    }
}


function* adminHistorySaga() {
  
  yield takeLatest("FETCH_CONFIRM", fetchConfirm);
  yield takeLatest("FETCH_HISTORY", fetchHistory)
}

export default adminHistorySaga;