const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();
const moment = require('moment');

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});





//Handles POST to the student table to add a new student
//The password is encrypted before being inserted into the database
router.post("/addadmin", (req, res, next) => {
  console.log("this is the new admin we are about to register", req.body);

  // pull out the incoming object data
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const created_at = req.body.created_at;
  const role = req.body.role;
  lcf_id = null;

  //initialize the id you will get from the student
  let admin_id = "";

  const queryText = `INSERT INTO "admin" 
                (first_name, last_name, email, password, role, created_at)
                VALUES($1, $2, $3, $4, $5, $6) RETURNING id `;
  pool
    .query(queryText, [
      first_name,
      last_name,
      email,
      password,
      role,
      created_at,
    ])
    .then((result) => {
      console.log("this is the response", result.rows[0].id);
      //res.status(201).send(result.rows[0]);

      admin_id = result.rows[0].id;
      //now lets add admin information to the user table
      const query2Text =
        'INSERT INTO "user" (admin_id, lcf_id, email, password, role, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
      pool
        .query(query2Text, [
          admin_id,
          lcf_id,
          email,
          password,
          role,
          new Date(),
        ])
        .then(() => res.status(201).send(result.rows))
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







//Handles POST to the student table to add a new student
//The password is encrypted before being inserted into the database
router.post("/addstudent", (req, res, next) => {
  console.log("this is the new student we are about to register", req.body);
 

  // pull out the incoming object data
  
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const school_id = req.body.school_id || 0;
  const grade = Number(req.body.grade);
  const grad_year = req.body.grad_year;
  const last_login = null;
  const school_attend = req.body.school_attend;
  const lcf_id = req.body.lcf_id;
  const lcf_start_date = req.body.lcf_start_date;
  const student_email = req.body.student_email;
  const password = encryptLib.encryptPassword(req.body.password);
  const pif_amount = Number(req.body.pif_amount).toFixed(2);
  const created_at = moment.utc().format();
  const role = "student";
  const inactive = "no";
  const strikes = 0;
  const balance_due = 0; //just created an account, so no balance due
  admin_id = null;

  //initialize the id you will get from the student
  //let lcf_id = "";

  const queryText = `INSERT INTO "student" 
                (lcf_id, first_name, last_name, school_attend, school_id, student_email, password, grade, grad_year, last_login, created_at,   lcf_start_date, role,   pif_amount, strikes, inactive, balance_due)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING lcf_id `;
  pool
    .query(queryText, [
      lcf_id,
      first_name,
      last_name,
      school_attend,
      school_id,
      student_email,
      password,
      grade,
      grad_year,
      last_login,
      created_at,
      lcf_start_date,
      role,
      pif_amount,
      strikes,
      inactive,
      balance_due
    ])
    .then((result) => {
      console.log("this is the response", result.rows[0].id);
      //res.status(201).send(result.rows[0]);
      
      //lcf_id = result.rows[0].id;
      //now lets add student information to the user table
      const query2Text =
        'INSERT INTO "user" (lcf_id, admin_id, email, password, role, last_login) VALUES ($1, $2, $3, $4, $5, $6)';
      pool
        .query(query2Text, [
          lcf_id,
          null,
          student_email,
          password,
          'student',
          new Date(),
        ])
        .then(() => res.status(201).send(result.rows))
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





// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText =
    'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id';
  pool
    .query(queryText, [email, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  console.log("logging body", req.body.username)
  const email = req.body.username;
  // setting query text to update the username
  const queryText = `update "user" set "last_login" = NOW() WHERE "email"=$1`;

  pool.query(queryText, [email]).then((result) => {
    const query2Text = `UPDATE "student" SET "last_login" = NOW() WHERE "student_email"=$1`;
    pool
      .query(query2Text, [email])
      .then(() => res.sendStatus(201))
  });
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});



// PUT /api/user/adminpasswordreset/admin_id
router.put(`/adminpasswordreset/:admin_id`, (req, res) => {
  console.log('we are about to change the admin password:', req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const adminID = req.params.admin_id;
  const email = req.body.email;
  // setting query text to update the username
  const queryText = `UPDATE "admin" SET password=$1, email=$2 WHERE id=$3 `;

  pool
    .query(queryText, [newPassword, email, adminID])
    .then((result) => {
      console.log("Success in updating password or email!");

      const query2Text = `UPDATE "user" SET password=$1, email=$2 WHERE admin_id=$3`;
      const queryValue = [newPassword, email, adminID];
      pool
        .query(query2Text, queryValue)
             .then(() => res.sendStatus(201).res.send(result.rows))
          .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });
      
    })
    .catch((error) => {
      console.log(`Error on PUT with query ${error}`);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});
// end PUT /user/api/admin_id




// PUT /api/user/studentpasswordreset/student_id
router.put(`/studentpasswordreset/:lcf_id`, (req, res) => {
  console.log('we are about to change the student password:', req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const studentID = req.params.lcf_id;
  const email = req.body.email;
  // setting query text to update the username
  const queryText = `UPDATE "student" SET password=$1, student_email=$2 WHERE lcf_id=$3 `;

  pool
    .query(queryText, [newPassword, email, studentID])
    .then((result) => {
      console.log("Success in updating password or email for student!");

      const query2Text = `UPDATE "user" SET password=$1, email=$2 WHERE lcf_id=$3`;
      const queryValue = [newPassword, email, studentID];
      pool
        .query(query2Text, queryValue)
        .then(() => res.sendStatus(201).res.send(result.rows))
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });

    })
    .catch((error) => {
      console.log(`Error on PUT with query ${error}`);
      console.log(studentID);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});
// end PUT /api/user/studentpasswordreset/student_id

//Need to delete for testing purposes
//DELETE student
router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "student" "user" WHERE lcf_id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE /api/order", error);
      res.sendStatus(500);
    });
});


module.exports = router;
