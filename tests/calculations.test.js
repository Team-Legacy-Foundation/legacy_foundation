const axios = require('axios');

// override default axios adapter so that it ignores cors for server-side requests
 axios.defaults.adapter = require('axios/lib/adapters/http');

//Bring in need reducers here:

//Here is what a sample test could look like :

// test('Reducer returns default state if state is undefined', () => {
//   const result = currentItemReducer(undefined, {});
//   expect(typeof (result)).toBe(typeof ([]));
  
//   expect(result).toEqual({
//     emotionValue: 0,
//     iconsArray: [],
//     note: '',
//   });
// });

//Or if just testing put specfific function:

// test('pass in good case',() => {
//   expect(dna('CTAGGGTA')).toEqual('CTAGGGTA');
// });

//Example from pet hotel:

// 



// let petOwner = null;
// let pet = null;

// const SERVER_URL = 'http://localhost:5000';
// test('Create a new petOwner via HTTP POST', async () => {
//     const newOwner = {name: 'test owner', emailAddress: 'test@example.com'};
//     const response = await axios.post(`${SERVER_URL}/api/petowners`, newOwner);
//     petOwner = response.data;
//     expect(response.status).toBe(201);
//     expect(typeof(response.data)).toBe(typeof({}));
//     expect(typeof(response.data.id)).toBe(typeof(0));
//     console.log(`Pet Owner created with id ${petOwner.id}`);
//     // console.log(response.data);
// });

//////////////////////////////////////////////////////////////////////////////
//-------Create a new student----------------------
let student=null;
const SERVER_URL = 'http://localhost:5000';
test('Create a new student via HTTP POST', async () => {
    const newStudent = {lcf_id: 100, first_name: 'New', last_name:'Student', grade: 7, school_attend:'Horizon', student_email:'test@example', password:'test', lcf_start_date:'01/01/2020', pif_amount:'3.00', grad_year:'2021'};
    const response = await axios.post(`${SERVER_URL}/api/user/addstudent`, newStudent);
    student = response.data;
    expect(response.status).toBe(201);
    expect(typeof(response.data)).toBe(typeof({}));
    expect(typeof(response.data.id)).toBe(typeof(0));
    console.log(`Student created with id ${student.id}`);
    // console.log(response.data);
});

//-----------FAILED cases (i.e. student does not get check)-------------------

//student is failing at least one class

//student's GPA is less than 2.0 (need to check rounding?)

//student has detention hours

//student is not involved in school activities and no job

//student is not living a drug free life

//student has less than 2 service hours for that pay period

//student did not attend manadatory homeroom

//student is deemed inactive (3 strike rule)

//--------------GPA bonus cases---------------------------------
//NEED TO HANDLE ROUNDING TOO

//if 2.0

//if 2.5

//if 3.0

//if 3.5

//if 4.0

//-------------MIDDLE SCHOOLER (base pay of $5)-------------------------------

//if 6th grade

//if 7th grade

//if 8th grade

//--------------HIGH SCHOOLER (base pay of $10)----------------------------

//if 9th grade

//if 10th grade

//if 11th grade

//if 12th grade

//-------------Check how much is given to savings------------------------

//-------------Make sure charges are appropriately calculated-----------

//-----------Check case where student is overcharged (charge balance must remain)-----

//----------Check Pay It Forward is ran correctly--------------