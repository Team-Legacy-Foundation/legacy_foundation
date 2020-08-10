const studentHistory = (state = [], action) => {
    switch (action.type) {
      case "SET_STUDENT_HISTORY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default combineReducers({
    studentHistory,
  });