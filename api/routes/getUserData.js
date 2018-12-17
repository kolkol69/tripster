const express = require('express');
const firebase_api = require('../firebase_apikey');
const firebase = require("firebase");

const router = express.Router();
// Initialize Firebase
var config = {
    apiKey: firebase_api.key,
    authDomain: "tripster-5fc5d.firebaseapp.com",
    databaseURL: "https://tripster-5fc5d.firebaseio.com",
    projectId: "tripster-5fc5d",
    storageBucket: "tripster-5fc5d.appspot.com",
    messagingSenderId: "798900647773"
};
firebase.initializeApp(config);

var database = firebase.database();


function getUserData(res, userId = 0) {
    var usersRef = database.ref('users');
    usersRef.on('value',  (snapshot) => {
        snapshot.forEach( (childSnapshot) => {
            var childData = childSnapshot.val();
            res.send(childData[userId]);
        });
    });
}

router.get('/', (req, res) => {
    getUserData(res);
});


router.get('/:id', (req, res) => {
    getUserData(res, req.params.id);
});

module.exports = router;