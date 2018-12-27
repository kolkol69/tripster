const express = require('express');
const firebase_api = require('../firebase.apikey');
const firebase = require("firebase");

const router = express.Router();
var config = {
    apiKey: firebase_api.key,
    authDomain: "tripster2-0.firebaseapp.com",
    databaseURL: "https://tripster2-0.firebaseio.com",
    projectId: "tripster2-0",
    storageBucket: "tripster2-0.appspot.com",
    messagingSenderId: "1058324113756"
  };
firebase.initializeApp(config);

var database = firebase.database();


function getUserData(res, userId = 0) {
    var usersRef = database.ref('users');
    usersRef.once('value',  (snapshot) => {
        snapshot.forEach( (childSnapshot) => {
            var childData = childSnapshot.val();
            res.send(childData[userId]);
        });
    }, (err)=>{
        console.log(err);
        res.send('error: check server console!')
    });
}

router.get('/', (req, res) => {
    getUserData(res);
});


router.get('/:id', (req, res) => {
    getUserData(res, req.params.id);
});

module.exports = router;