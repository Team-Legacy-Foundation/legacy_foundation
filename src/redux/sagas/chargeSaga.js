import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* chargeStudent(action) {
  
  try {
    
    yield axios.post(`/charge`, action.payload);
  } catch (error) {
    console.log("Error posting charge:", error);
  }
}

function* fetchDeductions(action) {
  try {
    const response = yield axios.post('/api/admin/chargehistory');
    yield put({type: "SET_DEDUCTIONS", payload: response})
  } catch (error){
    console.log("error with deduction saga", error)
  }
}


function* chargeSaga() {
  yield takeLatest("CHARGE_STUDENT", chargeStudent);
  yield takeLatest("FETCH_DEDUCTIONS", fetchDeductions);
}

export default chargeSaga;