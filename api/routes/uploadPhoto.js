const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    // req.files is the `photo` file
    // req.body will hold the text fields, if there were any
    // console.log(req.files)
    const photo = req.files.photo;
    photo.mv(`./uploads/${req.files.photo.name}`, (err) => {
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        // console.log('Uploaded');
        res.send('File uploaded!'); 
      });
  })

module.exports = router;