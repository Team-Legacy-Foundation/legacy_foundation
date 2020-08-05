const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/adminlist', (req, res) => {
    console.log('We are about to get the admin list');

    const queryText = `SELECT * FROM admin;`;
    pool.query(queryText)
        .then((result) => {
            console.log('Here is the admin list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on admin query ${error}`);
            res.sendStatus(500);
        });

});



module.exports = router;