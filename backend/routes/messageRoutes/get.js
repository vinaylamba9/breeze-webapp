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

router.get(
	"/getMessageByChatID/:chatID",
	[
		userAuth.isLoggedIn,
		check("chatID").notEmpty().withMessage("Chat ID is required."),
	],
	MessageController.getMessageByChatID
);

module.exports = router;
