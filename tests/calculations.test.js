const axios = require("axios");

// override default axios adapter so that it ignores cors for server-side requests
axios.defaults.adapter = require("axios/lib/adapters/http");

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
//**************Admins**************** */
//----------POST a new admin-----------

//---------GET an admin-----------------

//---------PUT an admin----------------

//--------DELETE an admin--------------

//***************students**************** */
//-------POST a new student (create)----------------------
let student = null;
const SERVER_URL = "http://localhost:5000";
test("Create a new student via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 7,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 3.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  //expect(typeof response.data).toBe(typeof {}); I think response right now is set to just get id back?
  //expect(typeof response.data.id).toBe(typeof 0); was coming back undefined
  console.log(`Student created with id ${student.id}`);
  console.log('hi', response.data);
});

//--------GET a student (fetch)------------------
test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/student/student/${student.id}`);
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.id} successfully retrieved.`);
})

//---------PUT a student (update)--------------
test(`Update the student via HTTP PUT`, async () => {
  const newName = 'Newer';
  //I will likely have to type out all of sudent here agian since not getting all data back...
  student = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 7,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 3.00,
    grad_year: "2021",
  };
  const newStudent = {...student, first_name: newName};
  const response = await axios.put(`${SERVER_URL}/api/user//${student.id}`, newStudent);
  expect(response.status).toBe(200);
  //expect(response.data.first_name).toBe(newName);
  console.log(`Student with id ${student.id} name changed to ${newName}`);
  student = response.data;
})
//One work around: simply do a post and instead of checking post, use a get
//to try and check if it appears in the database
//Since dealing with double inserts, I can't always get back
//what I want all the time

//--------DELETE a student (delete)-----------
test('Delete the student via HTTP DELETE', async () => {
  const response = await axios.delete(`${SERVER_URL}/api/?????/${student.id}`);
  expect(response.status).toBe(204);
});

//**************Entries**************************** */
//------POST an entry (create)---------------------
test('Create a new entry via HTTP POST', async () => {

  //figure out if going by id or by lcf_id
  const newEntry = {student_id:1, pass_class:'yes', gpa:2.3, clean_attend:9, detent_hours:'no', act_or_job:'yes',passed_ua:'yes',current_service_hours:2, hw_rm_attended:'yes',comments:'Testing'};
  let response;
  try {
      response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
      console.log(err.response.data);
  }
  entry = response.data;
  expect(response.status).toBe(201);
  expect(typeof(response.data)).toBe(typeof({}));
  expect(typeof(response.data.id)).toBe(typeof(0));
  
  console.log(`Entry created with id ${entry.id} and owner ${student.first_name}`);
});

/*************************************************** */
//-----------FAILED cases (i.e. student does not get check)-------------------

//student is failing at least one class
//WILL THESE BE ON DIFFERENT RESPONSES?
//Either... post data where example student fails it and check other route?
//Or just have entry already created and then check calulations?
//Will have to see how backend works... what is coming from where

// expect(response.data.pass_class).toBe('no');
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);

//student's GPA is less than 2.0 (need to check rounding?)

//student has detention hours

//student is not involved in school activities and no job

//student is not living a drug free life

//student has less than 2 service hours for that pay period

//student did not attend manadatory homeroom

//student is deemed inactive (3 strike rule)

//--------------GPA bonus cases---------------------------------
//NEED TO HANDLE ROUNDING TOO (rounding should be done in SQL land?)

//if 2.0

//if 2.5

//if 3.0

//if 3.5

//if 4.0

//-------------MIDDLE SCHOOLER (base pay of $5)-------------------------------

//if 6th grade
//will I post a new student here and then run other axios? Where do I look at response?

//expect(response.data.total).toBe(NUMBER);


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
