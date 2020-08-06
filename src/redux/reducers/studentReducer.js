import { combineReducers } from "redux";

const studentlist = (state = [], action) => {
    switch (action.type) {
        case "SET_STUDENTS":
            return action.payload;
        default:
            return state;
    }
};



const studententriesadmin = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENT_ENTRIES_ADMIN_VIEW':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
   studentlist,
   studententriesadmin,
});