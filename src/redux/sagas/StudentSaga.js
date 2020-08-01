
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker saga: will be fired on REGISTER_STUDENT actions
//this action registers a new student, the information is entered
//by the organizational admin, when he/she is logged into their account

function* registerStudent(action) {
    try{
        //clear any errors on the page before
        yield put ({ type: 'CLEAR_ADD_STUDENT_ERROR' });

        //passes the incoming new student user info from the payload to the server
        console.log('we are about to register a new student', action.payload);
        yield axios.post('/api/user/addstudent', action.payload);

         yield put({ type: "GET_STUDENTS"});
      

        console.log('we are about to send data for a new student', action.payload);
    }catch(error){
        console.log('Error with student registration:', error);
        yield put ({ type: 'STUDENT_REGISTRATION_FAILED' });
    }
}


function* updateStudent(action) {
    try {
        //clear any errors on the page before
        yield put({
            type: 'CLEAR_UPDATE_STUDENT_ERROR'
        });

        //passes the incoming updated student user info from the payload to the server
        yield axios.post('/api/student/updatestudent', action.payload);
         yield put({ type: "GET_STUDENTS"});

        console.log('we are about to send data for a student update', action.payload);
    } catch (error) {
        console.log('Error with student update:', error);
        yield put({
            type: 'STUDENT_UPDATE_FAILED'
        });
    }
}


function* deleteStudent(action) {
    try {
        //clear any errors on the page before
        yield put({
            type: 'CLEAR_DELETE_STUDENT_ERROR'
        });

        //sends the id for the student to be deleted to the server
        yield axios.delete(`/api/student/${action.payload.id}`);

        console.log('we are about to delete the student with this id:', action.payload.id);

        yield put({ type: 'GET_STUDENTS', payload: action.payload })

    } catch (error) {
        console.log('Error with student deletion:', error);
        yield put({
            type: 'STUDENT_DELETION_FAILED'
        });
    }
}

function* getStudents(action) {
        try {
            //console.log('we are about to get Students', action.type);

            const response = yield axios.get(`/api/student/studentlist`);

            yield put({
                type: 'SET_STUDENTS',
                payload: response.data
            });

            console.log('Here is the list of student', response.data);
        } catch (error) {
            console.log('Error with getting the list of Students:', error);
        }
}

function* StudentSaga() {
    yield takeLatest('REGISTER_STUDENT', registerStudent);
     yield takeLatest('UPDATE_STUDENT', updateStudent);
     yield takeLatest('DELETE_STUDENT', deleteStudent);
     yield takeLatest('GET_STUDENTS', getStudents);
     
}

export default StudentSaga;






