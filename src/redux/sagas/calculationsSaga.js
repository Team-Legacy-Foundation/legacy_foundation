import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCalculations() {
  try {
    yield axios.get("/api/admin/calc");
    const response = yield axios.get("/api/admin/pending")
    console.log('response in fetchCalc is', response)
    yield put({ type: "SET_CALCULATIONS", payload: response.data });
  } catch (error) {
    console.log("error fetch ", error);
  }
}


function* addEntrySaga() {
  
  yield takeLatest("FETCH_CALCULATIONS", fetchCalculations);
}

export default addEntrySaga;