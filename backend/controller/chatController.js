/**

     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

require("dotenv").config();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../utils/basicUtils");
const { DB_UTILS, CHAT_DB_UTILS } = require("../utils/dbUtils");

/* ================ CONSTANTS FILES  =================*/
const { HTTPStatusCode } = require("../constants/network");

/* ================ MODELS FILES  =================*/
const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
const { RegEx } = require("../constants/application");

const chatController = {
	/** This Function will be used for creating chats. */
	/**
	 * @Function createChat()
	 * @param {*} req
	 * @param {*} res
	 * @returns creates a chat.
	 */
	createChat: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const { userID } = req.body;
			if (BASIC_UTILS._isNull(userID) || !userID) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
				responseData = "Please provide userID.";
			} else {
				const checkUserIdExist = await DB_UTILS.findByID(userID);
				if (userID === req.user.userId) {
					responseStatusCode = HTTPStatusCode.BAD_REQUEST;
					responseMessage = HTTPStatusCode.BAD_REQUEST;
					responseData = "Chat cannot be created.";
				} else if (checkUserIdExist?.status === "NOT_FOUND") {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "User not found.";
				} else {
					let chat = await CHAT_DB_UTILS.findOneToOne(
						userID,
						req.user.userId,
						userModel
					);

					if (chat.length > 0) {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = chat[0];
					} else {
						const chatData = {
							chatName: "sender",
							isGroupChat: false,
							users: [req.user.userId, userID],
						};
						const createdChat = await CHAT_DB_UTILS.createChat(chatData);
						const completeChat = await CHAT_DB_UTILS.findChatByID(
							createdChat._id
						);
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = completeChat;
					}
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

	/**
	 * @Function FetchChats()
	 * @param {*} req
	 * @param {*} res
	 * @returns the chat that particular user is a part of.
	 */
	fetchChats: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const findChat = await CHAT_DB_UTILS.findByID(req.user.userId);
			if (findChat.length === 0) {
				responseStatusCode = HTTPStatusCode.NOT_FOUND;
				responseMessage = HTTPStatusCode.NOT_FOUND;
				responseData = "No chat found";
			} else {
				responseStatusCode = HTTPStatusCode.OK;
				responseMessage = HTTPStatusCode.OK;
				responseData = findChat;
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

	/**
	 * @Function createGroupChat()
	 * @param {*} req
	 * @param {*} res
	 * @returns Creates a Group Chat
	 */
	createGroupChat: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.users && req.body.users?.length < 1) {
					responseStatusCode = HTTPStatusCode.BAD_REQUEST;
					responseData = {
						errors: [
							{
								msg: "User should be more than 1",
								param: "users",
								location: "body",
							},
						],
					};
					responseMessage = HTTPStatusCode.BAD_REQUEST;
				} else {
					let groupInclusiveLoggedInUser = req.body.users; // Create a Group including yourself
					groupInclusiveLoggedInUser?.push(req.user.userId); // Adding yourself
					const groupChat = await CHAT_DB_UTILS.createChat({
						chatName: req.body.name,
						users: groupInclusiveLoggedInUser,
						isGroupChat: true,
						groupAdmin: req.user.userId,
						groupImage: req.body.groupImage,
					});

					// Fetching Chat from DB and sending it back to user
					const completeGroupChat = await CHAT_DB_UTILS.findGroupChat(
						groupChat._id
					);

					responseStatusCode = HTTPStatusCode.OK;
					responseMessage = HTTPStatusCode.OK;
					responseData = completeGroupChat;
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
	/**
	 * @Function renameGroup()
	 * @param {*} req
	 * @param {*} res
	 * @returns Rename a Group Chat
	 */
	renameGroup: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const updatedChat = await CHAT_DB_UTILS.renameGroupChat(
						req.body.chatID,
						req.body.chatName || req.body.bio
					);

					if (!updatedChat) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "GROUP NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = updatedChat;
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "GROUP NOT FOUND.";
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
	/**
	 * @Function renameGroupBio()
	 * @param {*} req
	 * @param {*} res
	 * @returns Rename a Group Chat Bio
	 */
	renameGroupBio: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const updatedChat = await CHAT_DB_UTILS.renameGroupChatBio(
						req.body.chatID,
						req.body.bio
					);

					if (!updatedChat) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "GROUP NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = updatedChat;
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "GROUP NOT FOUND.";
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

	/**
	 * @Function updateGroupChatImage()
	 * @param {*} req
	 * @param {*} res
	 * @returns Update Group Profile Image
	 */
	updateGroupChatImage: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const updatedChat = await CHAT_DB_UTILS.updateGroupImage(
						req.body.chatID,
						req.body.groupImage
					);

					if (!updatedChat) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "GROUP NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = updatedChat;
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "GROUP NOT FOUND.";
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
	/**
	 * @Function updateRecentMessage()
	 * @param {*} req
	 * @param {*} res
	 * @returns Update Group Profile Image
	 */
	updateUnreadMessage: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const unreadMessage = req.body.isClear
						? await CHAT_DB_UTILS.clearUnreadMessage(
								req.body.chatID,
								req.body.userIDToClear
						  )
						: await CHAT_DB_UTILS.updateUnreadMessage(
								req.body.chatID,
								req.body.unreadMessageSenderID
						  );

					if (!unreadMessage) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "CHAT NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = unreadMessage;
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "CHAT NOT FOUND.";
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

	/**
	 * @Function AddToGroup()
	 * @param {*} req
	 * @param {*} res
	 * @returns Add a user to group
	 */
	addToGroup: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (
					req.body.chatID.match(RegEx.OBJECT_ID) &&
					req.body.userID.match(RegEx.OBJECT_ID)
				) {
					const userAlreadyExistInGroup = await CHAT_DB_UTILS.findByID(
						req.body.userID
					);

					if (userAlreadyExistInGroup && userAlreadyExistInGroup?.length > 0) {
						responseStatusCode = HTTPStatusCode.FORBIDDEN;
						responseMessage = HTTPStatusCode.FORBIDDEN;
						responseData = "USER ALREADY EXIST IN THE GROUP";
					} else {
						const addToGroup = await CHAT_DB_UTILS.addUserToGroup(
							req.body.chatID,
							req.body.userID
						);
						if (!addToGroup) {
							responseStatusCode = HTTPStatusCode.NOT_FOUND;
							responseMessage = HTTPStatusCode.NOT_FOUND;
							responseData = "GROUP NOT FOUND.";
						} else {
							responseStatusCode = HTTPStatusCode.OK;
							responseMessage = HTTPStatusCode.OK;
							responseData = addToGroup;
						}
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "GROUP NOT FOUND.";
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
	/**
	 * @Function addMultipleUsersToGroup()
	 * @param {*} req
	 * @param {*} res
	 * @returns Add a user to group
	 */
	addMultipleUsersToGroup: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const response = await CHAT_DB_UTILS?.addMultipleUserInGroup(
						req.body?.chatID,
						req?.body?.users
					);

					if (!response) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "GROUP NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = response;
					}
				} else {
					responseStatusCode = HTTPStatusCode.BAD_REQUEST;
					responseMessage = HTTPStatusCode.BAD_REQUEST;
					responseData = "CHAT_ID IS NOT VALID";
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
	/**
	 * @Function addRemoveMultipleUsersToGroup()
	 * @param {*} req
	 * @param {*} res
	 * @returns Add a user to group
	 */
	addRemoveMultipleUsersToGroup: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (req.body.chatID.match(RegEx.OBJECT_ID)) {
					const response = await CHAT_DB_UTILS?.addRemoveMultipleUserInGroup(
						req.body?.chatID,
						req?.body?.users
					);

					if (!response) {
						responseStatusCode = HTTPStatusCode.NOT_FOUND;
						responseMessage = HTTPStatusCode.NOT_FOUND;
						responseData = "GROUP NOT FOUND.";
					} else {
						responseStatusCode = HTTPStatusCode.OK;
						responseMessage = HTTPStatusCode.OK;
						responseData = response;
					}
				} else {
					responseStatusCode = HTTPStatusCode.BAD_REQUEST;
					responseMessage = HTTPStatusCode.BAD_REQUEST;
					responseData = "CHAT_ID IS NOT VALID";
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
	/**
	 * @Function RemoveFromGroup()
	 * @param {*} req
	 * @param {*} res
	 * @returns Remove a user from group
	 */
	removeFromGroup: async function (req, res) {
		let responseStatusCode, responseMessage, responseData;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				responseStatusCode = HTTPStatusCode.BAD_REQUEST;
				responseData = errors;
				responseMessage = HTTPStatusCode.BAD_REQUEST;
			} else {
				if (
					req.body.chatID.match(RegEx.OBJECT_ID) &&
					req.body.userID.match(RegEx.OBJECT_ID)
				) {
					const userAlreadyExistInGroup = await CHAT_DB_UTILS.findByID(
						req.body.userID
					);

					if (userAlreadyExistInGroup?.length === 0) {
						responseStatusCode = HTTPStatusCode.FORBIDDEN;
						responseMessage = HTTPStatusCode.FORBIDDEN;
						responseData = "USER NOT FOUND IN THE GROUP";
					} else {
						const removedFromGroup = await CHAT_DB_UTILS.removeUserToGroup(
							req.body.chatID,
							req.body.userID
						);
						if (!removedFromGroup) {
							responseStatusCode = HTTPStatusCode.NOT_FOUND;
							responseMessage = HTTPStatusCode.NOT_FOUND;
							responseData = "GROUP NOT FOUND.";
						} else {
							responseStatusCode = HTTPStatusCode.OK;
							responseMessage = HTTPStatusCode.OK;
							responseData = "USER REMOVED SUCCESSFULLY";
						}
					}
				} else {
					responseStatusCode = HTTPStatusCode.NOT_FOUND;
					responseMessage = HTTPStatusCode.NOT_FOUND;
					responseData = "GROUP NOT FOUND.";
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

module.exports = chatController;
