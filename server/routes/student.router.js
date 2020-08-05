const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/studentlist', (req, res) => {
    console.log('We are about to get the student list');

    const queryText = `SELECT * FROM student;`;
    pool.query(queryText)
        .then((result) => {
            console.log('Here is the student list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on student query ${error}`);
            res.sendStatus(500);
        });
    
});

router.get('/student/:id', (req, res) => {
    console.log('We are about to get student with certain id');

    const queryText = `SELECT * FROM student WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on student query ${error}`);
            res.sendStatus(500);
        });
    
});


router.get('/studententries', (req, res) => {
    console.log('We are about to get the student entries');

    const queryText = `SELECT * FROM "entry" JOIN "student" ON "student"."id" = "entry"."student_id";`;
    pool.query(queryText)
        .then((result) => {
            console.log('Here is the student entry list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on student entry query ${error}`);
            res.sendStatus(500);
        });

});


// PUT /api/student/lcf_id
router.put(`/:lcf_id`, (req, res) => {

    console.log('We are updating a student entry', req.body);
    const entry = req.body;
    const {
       pass_class,
       gpa,
       first_name,
       last_name,
       lcf_id,
       absent,
       tardy,
       late,
       truant,
       clean_attend,
       detent_hours,
       after_school,
       act_or_job,
       passed_ua,
       current_service_hours,
       hw_rm_attended,
       comments,
    } = entry;
    const lcfID = req.params.lcf_id;
    let student_id = '';

    const query1Text = `SELECT id FROM "student" WHERE lcf_id=${lcfID}`;

    pool
     .query(query1Text)
     .then((result) => {
         console.log("this is the response", result.rows[0].id);
         //res.status(201).send(result.rows[0]);

         student_id = result.rows[0].id;
         //now lets add student information to the user table

    // setting query text to update the username
    const query2Text = `UPDATE "entry" SET pass_class=$1, gpa=$2, clean_attend=$3, detent_hours=$4, act_or_job=$5, passed_ua=$6, current_service_hours=$7, hw_rm_attended=$8, comments=$9 WHERE student_id=${student_id}`;
    const query2Value = [pass_class, gpa, clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours, hw_rm_attended, comments];

    pool
        .query(query2Text, query2Value)
        .then((result) => {
            console.log("Success in updating entry!");
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on PUT with query ${error}`);
            res.sendStatus(500); // if there is an error, send server error 500
        });
  });

});
// end PUT /api/student/lcf_id







/**
 * POST route template
 */
// router.post('/', (req, res) => {
// const student = req.body;

// const {
//     first_name,
//     last_name,
//     grade,
//     grad_year,
//     school_attend,
//     lcf_id,
//     lcf_start_date,
//     student_email,
//     password,
//     pif_amount,
//     created_at,
    
//   } = student;
//   if (student === undefined) {
//       // stop, dont touch the database
//       res.sendStatus(400); // 400 BAD REQUEST
//       return;
//   }
  
//   const queryText = `
//       INSERT INTO "student" (lcf_id, first_name, last_name, grade, grad_year, school_attend, student_email, password, created_at, lcf_start_date, role, last_login, pif_amount) 
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`; //grabs database
//   pool
//     .query(queryText, [
//       lcf_id,
//       first_name,
//       last_name,
//       grade,
//       grad_year,
//       school_attend,
//       student_email,
//       password,
//       created_at,
//       lcf_start_date,
//       'student',
//       new Date(),
//       pif_amount
//     ])
//     .then(function (result) {
//       // result.rows: 'INSERT 0 1';
//       // it worked!
//       console.log('post worked!')
//       res.sendStatus(200); // 200: OK
//     })
//     .catch(function (error) {
//       console.log("Sorry, there was an error with your query: ", error);
//       res.sendStatus(500); // HTTP SERVER ERROR
//     });
// });

module.exports = router;