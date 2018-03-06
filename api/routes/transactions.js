/**
 * The file contains REST endpoints for managing Transactions
 */

const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    res.send('Transactions are inserted!');
});

module.exports = router;
