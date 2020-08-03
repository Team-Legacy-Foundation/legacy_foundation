import { combineReducers } from "redux";

const entryList = (state = [], action) => {
  switch (action.type) {
    case "SET_ENTRY":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  entryList,
});
