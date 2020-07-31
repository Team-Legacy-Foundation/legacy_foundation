import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addEntry(action) {
  
  try {
    console.log(action.payload);
    yield axios.post(`/entry`, action.payload);
  } catch (error) {
    console.log("Error adding entry:", error);
  }
}

function* addEntrySaga() {
  yield takeLatest("ADD_ENTRY", addEntry);
}

export default addEntrySaga;
