const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('uploaded');
    res.send('ok');
});

module.exports = router;