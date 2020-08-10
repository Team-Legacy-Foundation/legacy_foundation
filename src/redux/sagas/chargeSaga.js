import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* chargeStudent(action) {
  
  try {
    
    yield axios.post(`/charge`, action.payload);
  } catch (error) {
    console.log("Error posting charge:", error);
  }
}


function* chargeSaga() {
  yield takeLatest("CHARGE_STUDENT", chargeStudent);
  
}

export default chargeSaga;