/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    res.send('Employees are inserted!');
});

module.exports = router;
