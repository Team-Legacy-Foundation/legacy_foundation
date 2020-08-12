import { combineReducers } from "redux";

const deductionList = (state = [], action) => {
    switch (action.type) {
        case 'SET_DEDUCTIONS':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    deductionList,
    
});