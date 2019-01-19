const express = require('express');
const firebase = require("firebase");

const router = express.Router();
var config = {
    apiKey: 'AIzaSyC2_1zwxux1iZw3Vl9itVao8TJzegpJA2Y',
    authDomain: "tripster2-0.firebaseapp.com",
    databaseURL: "https://tripster2-0.firebaseio.com",
    projectId: "tripster2-0",
    storageBucket: "tripster2-0.appspot.com",
    messagingSenderId: "1058324113756"
};
firebase.initializeApp(config);

const database = firebase.database();

function getUserData(res, userId) {
    let selectUsr;
    if(userId == 11111){
        selectUsr = 0;
    }else if( userId == 22222){
        selectUsr = 1;
    }else{
        selectUsr = 2;
    }

    console.log('>>>>userID',typeof userId);
    const dbref = database.ref('/users/users/');
    dbref.orderByChild('id').equalTo(userId).once('value')
        .then(snap => {
            res.send(snap.val()[selectUsr]);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
}
function getUserPostData(res, userId, postId = 1710) {
    const dbref = database.ref('/users/users/')
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


