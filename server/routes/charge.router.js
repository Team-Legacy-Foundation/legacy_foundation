const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const moment = require('moment');


 
router.post("/", rejectUnauthenticated, (req, res) => {
  
    // HTTP REQUEST BODY
    const charge = req.body; // pull the object out out of the HTTP REQUEST
    const {
      
      lcf_id,
      admin_id,
      date,
      type,
      description,
      amount
      
    } = charge;
    if (charge === undefined) {
        // stop, dont touch the database
        res.sendStatus(400); // 400 BAD REQUEST
        return;
    }
    
    //this will create a new row for a chrage in the "charge_student" table
    const queryText = `

        INSERT INTO "charge_student" (lcf_id, admin_id, date, type, description, amount) 
        VALUES ($1, $2, $3, $4, $5, $6);`; //grabs database

    pool
      .query(queryText, [
        lcf_id,
        admin_id,
        date,
        type,
        description,
        amount
      ])
      .then((result) => {
        const query2Text =
        'UPDATE "student" SET balance_due=$1+balance_due WHERE lcf_id=$2'; //do we want to just tack on the addition here?
        //That way, the total is always reflected here? Something to figure out
      pool
        .query(query2Text, [
          amount,
          lcf_id
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




module.exports = router;