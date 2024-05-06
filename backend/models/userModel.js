require("dotenv").config();
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("mongoose-long")(mongoose);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = mongoose.Schema(
	{
		userId: {
			type: SchemaTypes.ObjectId,
			immutable: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		profileImage: {
			type: String,
			// required: true,
			// default:''
		},
		bio: {
			type: String,
			default: "Hey! Let's Breeze.",
		},
		isVerified: {
			type: Boolean,
		},
		accountInItFrom: {
			type: Number,
		},
		accountStatus: {
			type: Number,
		},
		otp: {
			type: String,
		},
		otpValidTill: {
			type: Date,
		},
		token: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userModel.methods.toJSON = function () {
	try {
		const user = this;
		const userObject = user.toObject();
		delete userObject.password;
		return userObject;
	} catch (error) {
		return error;
	}
};

userModel.methods.createToken = async function () {
	try {
		let payload = {
			userId: this._id,
			name: this.name,
			password: this.password,
			email: this.email,
			profileImage: this.profileImage,
		};
		const token =
			"Bearer " +
			jwt.sign(payload, process.env.PRIVATE_TOKEN, {
				expiresIn: "2h",
			});
		return token;
	} catch (error) {
		return error;
	}
};

userModel.pre("save", async function (next) {
	const user = this;
	if (user.password && user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

module.exports = mongoose.model("User", userModel);
