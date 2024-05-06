/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

const express = require("express");
const app = express();
const router = express.Router();
const { check, validationResult } = require("express-validator");
/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../../utils/basicUtils");
const DB = require("../../utils/dbUtils");
const { userAuth } = require("../../middleware/userAuth");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode } = require("../../constants/network");
const userController = require("../../controller/userController");

router.put(
	"/updateUserByUserID",
	[
		userAuth.isLoggedIn,
		check("userID").notEmpty().withMessage("User_Id is required."),
	],
	userController.updateUserDetails
);

module.exports = router;
