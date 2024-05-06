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

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../../utils/basicUtils");
const DB = require("../../utils/dbUtils");
const auth = require("../../middleware/userAuth");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode } = require("../../constants/network");
const userController = require("../../controller/userController");

router.get(
	"/getallusers",
	auth.userAuth.isLoggedIn,
	userController.getAllUsers
);

router.get("/getall", auth.userAuth.isLoggedIn, userController.getAll);

module.exports = router;
