import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

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
}

export default addEntrySaga;