const express = require('express');
const firebase_api = require('../../firebase.apikey');
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

// function getUserData(res, userId = 22222) {
//     var usersRef = database.ref('users');
//     usersRef.once('value', (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             var childData = childSnapshot.val();
//             res.send(childData[userId]);
//         });
//     }, (err) => {
//         console.log(err);
//         res.send('error: check server console!')
//     });
// }

function getUserData(res, userId = 11111) {
    const dbref = firebase.database().ref('/users/users/');
    dbref.orderByChild('id').equalTo(userId).once('value')
        .then(snap => {
            res.send(snap.val()[0]);
        }).catch(err => {
            res.send(err);
        });
}
function getUserPostData(res, userId = 11111, postId = 1710) {
    const dbref = firebase.database().ref('/users/users/')
    dbref.orderByChild('id').equalTo(userId).once('value')
        .then(snap => {
            const data = snap.val()[0];
            const result = data.tours.filter(tour => tour.id === postId)[0];
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
}
router.get('/', (req, res) => {
    getUserData(res);
});

router.get('/:id', (req, res) => {
    getUserData(res, +req.params.id);
});

router.get('/:id/post/:postId', (req, res) => {
    getUserPostData(res, +req.params.id, +req.params.postId);
});

module.exports = router;


