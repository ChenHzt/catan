const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

const route = require("./routers/index");

require('./db/mongoose');

app.use(express.json());
app.use(cors());

app.use(route);
// app.use('/api/users', userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
