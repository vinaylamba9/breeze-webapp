/**
    ##     ## ########  ######   ######     ###     ######   ######## 
    ###   ### ##       ##    ## ##    ##   ## ##   ##    ##  ##       
    #### #### ##       ##       ##        ##   ##  ##        ##       
    ## ### ## ######    ######   ######  ##     ## ##   #### ######   
    ##     ## ##             ##       ## ######### ##    ##  ##       
    ##     ## ##       ##    ## ##    ## ##     ## ##    ##  ##       
    ##     ## ########  ######   ######  ##     ##  ######   ######## 
 */

const express = require("express");
const { check, validationResult } = require("express-validator");
const { userAuth } = require("../../middleware/userAuth");
const MessageController = require("../../controller/messageController");
const app = express();
const router = express.Router();

router.post(
	"/createMessage",
	[
		userAuth.isLoggedIn,
		check("chatID").notEmpty().withMessage("Chat ID is required."),
		check("content").notEmpty().withMessage("content is required."),
	],
	MessageController.sendMessage
);

module.exports = router;
