const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const fs = require('fs');

router.get('/', (req, res, next) => {

    let usersCount = 10;

    async function generateUsers() {
        let arrayOfUsers = [];

        for (let i = 0; i < usersCount; i++) {
            let user = {};
            user.following = Math.floor(Math.random() * 20);
            user.followers = Math.floor(Math.random() * 20);
            await generateTour().then(tour => user.tour = tour);
            user.id = i;
            user.region = await fetch('https://uinames.com/api/').then(res => res.json()).then(resJson => resJson.region);
            user.name = await fetch('https://uinames.com/api/').then(res => res.json()).then(resJson => resJson.name);
            user.profileDescription = await fetch(' http://www.randomtext.me/api/')
                .then(res => res.json())
                .then(resJson => resJson.text_out.substring(3, 30+Math.floor(Math.random()*50)));
            user.profileImage = await fetch('https://api.adorable.io/avatars/285/' + randomString() + '@' + randomString() + '.png')
                .then(res => res.url);
            await getRandomPhotos().then(photos => user.photos = photos);

            arrayOfUsers.push(user);
        }
        return arrayOfUsers;
    }

    async function generateTour(){
        let tour = {};
        tour.likes = [];
        tour.startDate = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
        tour.endDate = new Date(+(new Date()) + Math.floor(Math.random()*10000000000));
        for(let i=0; i<Math.floor(Math.random()*usersCount); i++){
            tour.likes.push(i)
        }
        tour.id = Math.floor(Math.random() * 10000);

        await generatePlaces().then(places => tour.places = places);

        return tour;
    }

    async function generatePlaces(){
        let places = [];
        let count = Math.floor(3 + Math.random() * 10);

        for(let i=0; i<count; i++){
            let place = {};
            place.name = await fetch(' http://www.randomtext.me/api/')
                .then(res => res.json())
                .then(resJson => resJson.text_out.substring(3, Math.floor(Math.random()*20)));
            place.description = await fetch(' http://www.randomtext.me/api/')
                .then(res => res.json())
                .then(resJson => resJson.text_out.substring(3, 50 + Math.floor(Math.random()*50)));
            place.rating = Math.floor(Math.random() * 10);
            place.id = Math.floor(Math.random() * 10000);
            place.location = {lat: Math.random() * (52 - 49) + 49, lng: Math.random() * (22 - 18) + 18};
            await generateTourImages().then(images => place.images = images);
            places.push(place);
        }

        return places;
    }

    async function generateTourImages(){
        let tourImages = [];
        let count = Math.floor(2 + Math.random() * 10);

        for(let i=0; i<count; i++){
            let tourImage = {};
            tourImage.likes = [];
            tourImage.name = await fetch(' http://www.randomtext.me/api/')
                .then(res => res.json())
                .then(resJson => resJson.text_out.substring(3, Math.floor(Math.random()*20)));
            tourImage.description = await fetch(' http://www.randomtext.me/api/')
                .then(res => res.json())
                .then(resJson => resJson.text_out.substring(3, 50 + Math.floor(Math.random()*50)));
            tourImage.id = Math.floor(Math.random() * 10000);
            tourImage.url = await fetch('https://picsum.photos/200?random').then(res => res.url)
            for(let i=0; i<Math.floor(Math.random()*usersCount); i++){
                tourImage.likes.push(i)
            }
            tourImages.push(tourImage);
        }

        return tourImages;
    }

    async function getRandomPhotos(){
        let photos = [];
        let count = Math.floor(Math.random() * 10);

        for(let i=0; i<count; i++){
            await fetch('https://picsum.photos/200?random').then(res => photos.push(res.url))
        }
        return photos;
    }

    function randomString() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


    generateUsers().then(users => {
        fs.writeFileSync('./users.json', JSON.stringify(users), 'utf8', () => console.log('success'));
        res.send('ok');
    })

});


module.exports = router;