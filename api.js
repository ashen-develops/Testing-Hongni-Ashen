/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const games = require('./games.js');

const app = express();

app.use(morgan('dev'))
app.get('/', (req, res) =>{
  res.send('Hello!')
})

app.get('/apps', (req, res) => {
  console.log('req.query ', req.query)
  const {genres, sort} = req.query;
  let data = games;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)){
      return res.status(400).send('Sort must be Rating or App.')
    }
  }
  console.log(sort);

  if (sort) {
    data.sort((currentGame, nextGame) => {
      // return currentGame[sort] > nextGame[sort] ? 1 : currentGame[sort] < nextGame[sort] ? -1 : 0;
      if (currentGame[sort] > nextGame[sort]) return 1;
      if (currentGame[sort] < nextGame[sort]) return -1;
      return 0;
    });
  }
  if ((genres) && (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres))) {
    res
      .status(400)
      .send('Invalid genre');
  }

  res.status(200).send(data);

  
});

/*app.listen(8000, () => {
  console.log('Server started on port 8000');
});*/

module.exports = app