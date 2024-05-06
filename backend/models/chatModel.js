require("dotenv").config();
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("mongoose-long")(mongoose);

const chatModel = mongoose.Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		groupImage: {
			type: String,
		},
		users: [
			{
				type: SchemaTypes.ObjectId,
				ref: "User",
			},
		],
		recentMessage: {
			type: SchemaTypes.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		bio: {
			type: String,
			default: "Hey! Let's Breeze.",
			trim: true,
		},
		unreadMessage: [
			{
				type: SchemaTypes.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Chat", chatModel);
