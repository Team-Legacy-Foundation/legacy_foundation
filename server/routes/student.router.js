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