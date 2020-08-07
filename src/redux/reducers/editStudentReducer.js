const editStudentReducer = (state = {}, action) => {
 
  //let newState = { ...state };
  switch (action.type) {
    case 'EDIT_STUDENT':
      console.log('this is action here', action)
      return action.payload;
    default:
      return state;
  }
};



export default editStudentReducer;