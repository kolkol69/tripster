const express = require('express');
// const path = require('path');
// const open = require('open');
const start_router = require('./routes/start');
const fakeUsers = require('./routes/fakeUsers');
const getPlaces = require('./routes/getPlaces');
const startTour = require('./routes/startTour');
const addPOI = require('./routes/addPOI');
const getUserData = require('./routes/getUserData');

const port = 8873;
const app = express();
//https://tripster-5fc5d.firebaseio.com/users/users


// const readFromFB = () => {
//   console.log('usersRef: \n', usersRef)
// }

app.use((req, res, next) => {
  const origin = req.get('origin');

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  req.method === 'OPTIONS' ? res.sendStatus(204) : next();
});
app.use('/', start_router);
app.use('/generateFakeUsers', fakeUsers);
app.use('/getPlaces', getPlaces);
app.use('/startTour', startTour);
app.use('/addPOI/', addPOI);
app.use('/user', getUserData);




app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log(`Server started at: http://localhost:${port}`)
  }
});