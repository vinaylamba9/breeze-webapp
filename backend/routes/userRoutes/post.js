/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

/* ================ CONTROLLER  FILES  =================*/
const userController = require("../../controller/userController");

router.post(
	"/signup",
	[
		check("name").notEmpty().withMessage("Name is required.").trim(),
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
		check("password")
			.notEmpty()
			.withMessage("Password is required.")
			.trim()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	userController.registerUser
);

router.post(
	"/login",
	[
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
		check("password")
			.notEmpty()
			.withMessage("Password is required.")
			.trim()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	userController.loginUser
);

router.post(
	"/verifyotp",
	[
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
		check("otp")
			.notEmpty()
			.withMessage("OTP is required")
			.trim()
			.isLength({ min: 6, max: 6 })
			.withMessage("OTP must be of length 6 characters long."),
	],
	userController.verifyOTP
);

router.post(
	"/forgotpassword",
	[
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
	],
	userController.forgotPassword
);
router.post(
	"/resendOTP",
	[
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
	],
	userController.resendOTP
);
router.post(
	"/updatepassword",
	[
		check("email")
			.notEmpty()
			.withMessage("Email is required.")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid Email."),
		check("password")
			.notEmpty()
			.withMessage("Password is required.")
			.trim()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long."),
		check("otp")
			.notEmpty()
			.withMessage("OTP is required")
			.trim()
			.isLength({ min: 6, max: 6 })
			.withMessage("OTP must be of length 6 characters long."),
	],
	userController.updatePassword
);

module.exports = router;
