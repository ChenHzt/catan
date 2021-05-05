const express = require('express');
const auth = require('../middlewares/auth')
const userController = require('../controllers/user.controller');

const router = express.Router();

//create new user
router.post("/api/users", userController.createUser) //permission to all v

//login user
router.post("/api/users/login", userController.login) //permission to all v

//login user
router.post("/api/users/logout", auth, userController.logout) //permission to user logged in v

//get user logged in
router.get("/api/users/me", auth , userController.getUserLoggedIn); //permission for user logged in v



module.exports = router;
