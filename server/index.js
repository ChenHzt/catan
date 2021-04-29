const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();

require("./db/mongoose");
// const userRouter = require("./routers/users.js");

app.use(express.json());
app.use(cors());
// app.use("/api",userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
