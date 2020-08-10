import { combineReducers } from "redux";
const studentHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_STUDENT_HISTORY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default combineReducers({
    studentHistoryReducer,
  });