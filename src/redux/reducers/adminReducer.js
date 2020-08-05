import { combineReducers } from "redux";

const adminlist = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    adminlist,
    
});