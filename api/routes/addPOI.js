const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const fs = require('fs');

router.get('/', (req, res, next) => {

    res.send('dodano poi');

    //cala reszta do zrobienia

});


module.exports = router;