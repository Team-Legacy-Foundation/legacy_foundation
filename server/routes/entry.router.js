const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool
      .query("SELECT * from entry")
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error GET /recommendations", error);
        res.sendStatus(500);
      });
}) //end GET

/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log('This means entry router is running')
    // HTTP REQUEST BODY
    const entry = req.body; // pull the object out out of the HTTP REQUEST
    const {
      pass_class,
      gpa,
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
    if (entry === undefined) {
        // stop, dont touch the database
        res.sendStatus(400); // 400 BAD REQUEST
        return;
    }
    
    const queryText = `
        INSERT INTO "entry" (pass_class, gpa, clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours, hw_rm_attended, comments) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`; //grabs database
    pool
      .query(queryText, [
        pass_class,
        gpa,
        clean_attend,
        detent_hours,
        act_or_job,
        passed_ua,
        current_service_hours,
        hw_rm_attended,
        comments,
      ])
      .then(function (result) {
        // result.rows: 'INSERT 0 1';
        // it worked!
        console.log('post worked!')
        res.sendStatus(200); // 200: OK
      })
      .catch(function (error) {
        console.log("Sorry, there was an error with your query: ", error);
        res.sendStatus(500); // HTTP SERVER ERROR
      });
}); // end POST

module.exports = router;