const express = require('express');
const morgan = require('morgan');
const games = require('./games.js');

const app = express();

app.use(morgan('dev'))
app.get('/', (req, res) =>{
  res.send('Hello!')
})

app.get('/apps', (req, res) => {
  const {genres, sort} = req.query;
  let data = games;

  if (sort) {
    if (!['rating', 'app'].includes(sort)){
      return res.status(400).send('Sort must be Rating or App.')
    }
  }

  if (sort) {
    data.sort((currentGame, nextGame) => {
      // if (currentGame[sort] > nextGame[sort]){
      //   return 1
      // }
      // else if (currentGame[sort] < nextGame[sort]){
      //   return -1
      // }
      // else {
      //   return 0
      // }

      return currentGame[sort] > nextGame[sort] ? 1 : currentGame[sort] < nextGame[sort] ? -1 : 0;
    })
  }
   
  res.send(data);
})

app.listen(8000, () => {
  console.log('Server started on port 8000')
})