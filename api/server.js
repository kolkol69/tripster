const express = require('express');
// const path = require('path');
// const open = require('open');
const start_router = require('./routes/start');

const port = 8873;
const app = express();

app.use((req, res, next) => {
  const origin = req.get('origin');

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  req.method === 'OPTIONS' ? res.sendStatus(204) : next();
});
app.use('/', start_router);
app.use('/test', start_router);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log(`Server started at: http://localhost:${port}`)
  }
});