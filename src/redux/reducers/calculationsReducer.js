import { combineReducers } from "redux";

const calculations = (state = [], action) => {
  switch (action.type) {
    case "SET_CALCULATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  calculations,
});