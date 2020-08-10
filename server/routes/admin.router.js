const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/adminlist', (req, res) => {
    console.log('We are about to get the admin list');

    const queryText = `SELECT * FROM admin;`;
    pool.query(queryText)
        .then((result) => {
            //console.log('Here is the admin list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on admin query ${error}`);
            res.sendStatus(500);
        });

});

router.get('/calc', (req, res) => {
    console.log('running the calculations for entries');
    const queryText = 'CALL calc()';
    pool.query(queryText)
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error running the calculations', error);
        res.sendStatus(500);
    });
});

router.get('/pending', (req, res) => {
    console.log('Grabbing all pending transactions');
    const queryText = 'SELECT * FROM open_transaction'
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows).status(200);
    }).catch((error)=> {
        console.log('Problem with grabbing pending transactions')
        res.sendStatus(500);
    });
});

router.get('/confirm', (req, res) => {
    console.log('Finalizing transactions');
    const queryText = 'CALL confirm()';
    pool.query(queryText)
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error pushing to history records', error);
        res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    pool
      .query('DELETE FROM "open_transaction" WHERE id=$1', [req.params.id])
      .then((result) => {
        res.sendStatus(204); //No Content
      })
      .catch((error) => {
        console.log("Error DELETE ", error);
        res.sendStatus(500);
      });
  });
module.exports = router;