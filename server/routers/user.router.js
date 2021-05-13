const express = require("express");
const { auth } = require("../middelware/auth");
const userController = require("../controllers/user.controller");

const router = express.Router();

//create new user
router.post("/", userController.createUser); //permission to all v

//login user
router.post("/login", userController.login); //permission to all v

//login user
router.post("/logout", auth, userController.logout); //permission to user logged in v

//get user logged in
router.get("/me", auth, userController.getUserLoggedIn); //permission for user logged in v

module.exports = router;
