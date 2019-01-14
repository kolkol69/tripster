const express = require('express');
const router = express.Router();
const firebase = require("firebase");

const database = firebase.database();
router.get('/:id/post/:postId', (req, res) => {
    const uid = 11111;
    const tour = database.ref(`/users/users/${req.params.id}/tours/${req.params.postId}`);
    tour.transaction((post) => {
        if (post) {
            if (post.likes && post.likes.indexOf(uid) !== -1) {
                post.likes = post.likes.filter(like => like != uid);
            } else {
                if (!post.likes) {
                    post.likes = [];
                }
                const tmp = [...post.likes, uid]
                post.likes = tmp;
            }
        }
        return post;
    }, () => {
        console.log('\nOK\n');
        res.send('OK')
    });
});


module.exports = router;