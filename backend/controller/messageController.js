/**
    ##     ## ########  ######   ######     ###     ######   ######## 
    ###   ### ##       ##    ## ##    ##   ## ##   ##    ##  ##       
    #### #### ##       ##       ##        ##   ##  ##        ##       
    ## ### ## ######    ######   ######  ##     ## ##   #### ######   
    ##     ## ##             ##       ## ######### ##    ##  ##       
    ##     ## ##       ##    ## ##    ## ##     ## ##    ##  ##       
    ##     ## ########  ######   ######  ##     ##  ######   ######## 
 */

require("dotenv").config();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../utils/basicUtils");
const {
	DB_UTILS,
	CHAT_DB_UTILS,
	MESSAGE_DB_UTILS,
} = require("../utils/dbUtils");

/* ================ CONSTANTS FILES  =================*/
const { HTTPStatusCode } = require("../constants/network");

/* ================ MODELS FILES  =================*/
const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
const { RegEx } = require("../constants/application");

const MessageController = {
	sendMessage: async (req, res) => {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const formattedData = {
						sender: req.user.userId,
						content: req.body.content,
						chat: req.body.chatID,
					};
					const createMessage = await MESSAGE_DB_UTILS.createMessage(
						formattedData
					);

					const findChatAndUpdate = await CHAT_DB_UTILS.updateLatestMessage(
						req.body.chatID,
						createMessage
					);

					responseStatusCode = HTTPStatusCode.OK;
					responseData = createMessage;
					responseMessage = HTTPStatusCode.OK;
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "CHAT_ID NOT FOUND.";
				}
			}
		} catch (error) {
			responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR;
			responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
			responseData = error.toString();
		} finally {
			return res
				.status(responseStatusCode)
				.send({ message: responseMessage, data: responseData });
		}
	},
	getMessageByChatID: async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.params.chatID.match(RegEx.OBJECT_ID)) {
					const messageByChatIDResponse =
						await MESSAGE_DB_UTILS.findMessageByChatID(req.params.chatID);
					responseStatusCode = HTTPStatusCode.OK;
					responseMessage = HTTPStatusCode.OK;
					responseData = messageByChatIDResponse;
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "CHAT_ID NOT FOUND.";
				}
			}
		} catch (error) {
			responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR;
			responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
			responseData = error.toString();
		} finally {
			return res
				.status(responseStatusCode)
				.send({ message: responseMessage, data: responseData });
		}
	},
};

module.exports = MessageController;
