/*
     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

const express = require("express");
const chatController = require("../../controller/chatController");
const { userAuth } = require("../../middleware/userAuth");
const { check, validationResult } = require("express-validator");
const app = express();
const router = express.Router();

router.post("/createChat", userAuth.isLoggedIn, chatController.createChat);
router.post(
	"/createGroupChat",
	[
		check("name").notEmpty().withMessage("Group name is required.").trim(),
		check("users")
			.notEmpty()
			.withMessage("Users are required for group creation")
			.isLength({ min: 1 })
			.withMessage("Group must contain minimun 2 members."),
		userAuth.isLoggedIn,
	],
	chatController.createGroupChat
);
module.exports = router;
