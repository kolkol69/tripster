const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const fs = require('fs');

router.get('/test', (req, res, next) => {

   fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=50,18&radius=2137&key=AIzaSyCgfuWPC6I1I6HTD2L9c7OHIk43w82uNIE')
   .then(resp => {
      resp.json();
      res.send(resp);
   })
   .then(respJson => fs.writeFileSync('./places.json', JSON.stringify(respJson), 'utf8'));

});


module.exports = router;