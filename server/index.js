const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

require('./db/mongoose');
const gameRouter = require('./routers/game.router');

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => res.send('hi'));
app.use('/api/games', gameRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
