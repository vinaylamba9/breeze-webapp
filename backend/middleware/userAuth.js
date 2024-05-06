const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
const BASIC_UTILS = require("../utils/basicUtils");

const userAuth = {
	isLoggedIn: async function (req, res, next) {
		try {
			let token = req?.headers?.authorization?.split(" ")?.[1]; //SPLITTING THE BEARER TOKEN
			if (!token || token === undefined)
				return res
					.status(401)
					.json({ error: "TOKEN REQUIRED FOR AUTHENTICATION." });
			else {
				const profileData = await jwt.verify(token, process.env.PRIVATE_TOKEN);
				const data = BASIC_UTILS.cleanPassword(profileData);
				req.token = token;
				req.user = data;

				next();
			}
		} catch (error) {
			return res?.status(401)?.json({ error: "PLEASE AUTHENTICATE." });
		}
	},
	isLoggedInSocket: async function (socket, next) {
		try {
			const authHeader = socket.handshake.headers.authorization;

			if (!authHeader) {
				return next(new Error("TOKEN REQUIRED FOR AUTHENTICATION."));
			}
			const token = authHeader.split(" ")[1];
			if (!token) {
				return next(new Error("TOKEN REQUIRED FOR AUTHENTICATION."));
			}

			const profileData = await jwt.verify(token, process.env.PRIVATE_TOKEN);
			const data = BASIC_UTILS.cleanPassword(profileData);
			socket.request.token = token;
			socket.request.user = data;
			next();
		} catch (error) {
			return next(new Error("PLEASE AUTHENTICATE."));
		}
	},
};

module.exports = {
	userAuth,
};
