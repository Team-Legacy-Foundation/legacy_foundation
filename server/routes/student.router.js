const express = require('express');
const encryptLib = require("../modules/encryption");
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

    const queryText = `SELECT * FROM student WHERE lcf_id=$1;`;
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
router.put(`/updatestudent/:lcf_id`, (req, res) => {

      console.log("this is the new student we are about to update", req.body);

      // pull out the incoming object data
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const school_id = req.body.school_id || 0;
      const grade = Number(req.body.grade);
      const grad_year = req.body.grad_year;
      const school_attend = req.body.school_attend;
      const lcf_id = req.body.lcf_id;
      const lcf_start_date = req.body.lcf_start_date;
      const student_email = req.body.student_email;
      const password = encryptLib.encryptPassword(req.body.password);
      const pif_amount = Number(req.body.pif_amount).toFixed(2);
      const created_at = req.body.created_at;
      const role = "student";
      admin_id = null;

      //initialize the id you will get from the student
      let student_id = "";

      const queryText = `UPDATE "student" SET first_name =$1, last_name=$2, school_id=$3, grade=$4, grad_year=$5, school_attend=$6, lcf_id=$7, lcf_start_date=$8, student_email=$9, password=$10, pif_amount=$11, role=$12, created_at=$13
                WHERE lcf_id =${lcf_id} RETURNING id`;
      pool
        .query(queryText, [
          first_name,
          last_name,
          school_id,
          grade,
          grad_year,
          school_attend,
          lcf_id,
          lcf_start_date,
          student_email,
          password,
          pif_amount,
          role,
          created_at,
        ])
        .then((result) => {
          console.log("this is the response", result.rows[0].id);
          student_id = result.rows[0].id;
          //now lets add student information to the user table
          const query2Text = `UPDATE "user" SET student_id=$1, admin_id=$2, email=$3, password=$4, role=$5, last_login=$6 WHERE student_id =${student_id}`;
          pool
            .query(query2Text, [
              student_id,
              admin_id,
              student_email,
              password,
              "student",
              new Date(),
            ])
            .then(() => res.sendStatus(201))
            .catch(function (error) {
              console.log("Sorry, there was an error with your query: ", error);
              res.sendStatus(500); // HTTP SERVER ERROR
            });
        })
        .catch(function (error) {
          console.log("Sorry, there is an error", error);
          res.sendStatus(500);
        });
});
// end PUT /api/student/lcf_id

router.put(`/updatepassword/:lcf_id`, (req, res) => {

      console.log("this is the new student we are about to update", req.body);

      // pull out the incoming object data
       const password = encryptLib.encryptPassword(req.body.password);
       const lcf_id = req.body.lcf_id;
    

      //initialize the id you will get from the student
      let student_id = "";

      const queryText = `UPDATE "student" SET password=$1
                WHERE lcf_id =${lcf_id} RETURNING id`;
      pool
        .query(queryText, [
          password,
        ])
        .then((result) => {
          console.log("this is the response", result.rows[0].id);
          student_id = result.rows[0].id;
          //now lets add student information to the user table
          const query2Text = `UPDATE "user" SET password=$1 WHERE student_id =${student_id}`;
          pool
            .query(query2Text, [
              password,
            ])
            .then(() => res.sendStatus(201))
            .catch(function (error) {
              console.log("Sorry, there was an error with your query: ", error);
              res.sendStatus(500); // HTTP SERVER ERROR
            });
        })
        .catch(function (error) {
          console.log("Sorry, there is an error", error);
          res.sendStatus(500);
        });
});
// end PUT /api/student/lcf_id

// PUT /api/student/lcf_id
router.put("/deactivate", (req, res) => {
 // grabs id and places it in path
 const lcf_id = req.body.lcf_id;
  let queryText = `UPDATE student SET status = 'inactive' WHERE  lcf_id = $1`;
  pool
    .query(queryText, [lcf_id])

    .then(function (result) {
      console.log("Update entry item for id of", lcf_id);
      // it worked!
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});//end PUT

router.put("/activate", (req, res) => {
  // grabs id and places it in path
  const lcf_id = req.body.lcf_id;
  let queryText = `UPDATE student SET status = 'active' WHERE  lcf_id = $1`;
  pool
    .query(queryText, [lcf_id])

    .then(function (result) {
      console.log("Update entry item for id of", lcf_id);
      // it worked!
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});//end PUT
// // end PUT /api/student/lcf_id





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