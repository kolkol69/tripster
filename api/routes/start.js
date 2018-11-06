const express = require('express');
const router = express.Router();
// const path = require('path');

router.get('/', (req, res, next) => {
    console.log('OK');
    res.send('OK');
});


module.exports = router;