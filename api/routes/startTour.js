const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const fs = require('fs');

router.get('/', (req, res, next) => {

    res.send({tourID: Math.floor(Math.random() * 100000)}); //takie narazie fejkowe id

    //cala reszta do zrobienia

});


module.exports = router;