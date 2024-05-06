require("dotenv").config();
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("mongoose-long")(mongoose);

const messageModel = mongoose.Schema(
	{
		sender: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			trim: true,
		},
		chat: {
			type: SchemaTypes.ObjectId,
			ref: "Chat",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", messageModel);
