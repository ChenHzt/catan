const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

require('./db/mongoose');

if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, '../../client/build')))
} else {
  router.use(express.static(path.join(__dirname, '../../client/public')))
}
const gameRouter = require('./routers/game.router');
const userRouter = require('./routers/user.router');

app.use(express.json());
app.use(cors());

app.use('/api/games', gameRouter);
app.use('/api/users', userRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
