const express = require("express");
const router = express.Router();
const userRoute = require("./user.router");
const gameRoute = require("./game.router");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, "../../client/build")));
} else {
  router.use(express.static(path.join(__dirname, "../../client/public")));
}

router.use("/api/users", userRoute);
router.use("/api/games", gameRoute);

module.exports = router;
