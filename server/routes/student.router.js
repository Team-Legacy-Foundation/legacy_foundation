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
    // setting query text to update the username
    const queryText = `UPDATE "entry" SET first_name=$1, last_name=$2, lcf_id=$3, pass_class=$4, gpa=$5, clean_attend=$6, detent_hours=$7, act_or_job=$8, passed_ua=$9, current_service_hours=$10, hw_rm_attended=$11, comments=$12 WHERE lcf_id=${lcfID}`;
    const queryValue = [first_name, last_name, lcfID, pass_class, gpa, clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours, hw_rm_attended, comments];

    pool
        .query(queryText, queryValue)
        .then((result) => {
            console.log("Success in updating entry!");
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on PUT with query ${error}`);
            res.sendStatus(500); // if there is an error, send server error 500
        });
});
// end PUT /api/student/lcf_id


/**
 * POST route template
 */
router.post('/', (req, res) => {
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
});

module.exports = router;