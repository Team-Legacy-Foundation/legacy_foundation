import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEntry() {
  try {
    const response = yield axios.get("/entry");
    yield put({ type: "SET_ENTRY", payload: response.data });
  } catch (error) {
    console.log("error fetch ", error);
  }
}

function* addEntry(action) {
  console.log('inside addEntry saga',action.payload);
  try {
    
    yield axios.post(`/entry`, action.payload);
  } catch (error) {
    console.log("Error adding entry:", error);
  }
}

function* addEntrySaga() {
  yield takeLatest("ADD_ENTRY", addEntry);
  yield takeLatest("FETCH_ENTRY", fetchEntry);
}

export default addEntrySaga;