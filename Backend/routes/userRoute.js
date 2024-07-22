const express = require("express");
const {createUser, loginUser, getUser, logOut} = require("../controllers/userController");
const {isAuthenticatedUser} = require('../middleware/auth')


const router = express.Router();


router.route("/userRegister").post(createUser);

router.route("/userLogin").post(loginUser, isAuthenticatedUser);


router.route("/profileHeader").get(isAuthenticatedUser, getUser)


router.route("/userLogout").get(logOut);


module.exports = router;