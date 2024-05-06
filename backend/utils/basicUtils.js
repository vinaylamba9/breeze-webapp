const generateRandomString = function (length) {
	let output = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_:[]!@#$%^&*()_";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		output += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return output;
};

const notNull = function (input) {
	if (input != null && input != undefined) return true;
	else return false;
};

const _isNull = function (value) {
	if (value === null || value === undefined || value === "") return true;
	else return false;
};

const _isNotEmpty = function (value) {
	if (typeof value == "object") {
		if (Array.isArray(value)) {
			if (value != null && value != undefined && value.length > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (value != null && value != undefined) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		if (value != null && value != undefined && value != "") {
			return true;
		} else {
			return false;
		}
	}
};

const hasWhiteSpace = (s) => /\s/g.test(s);

const otpGenrator = function (length) {
	let result = "";
	let characters = "0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const timeON = {
	timeDiffrenceInMin: function (newDate, oldDate) {
		let timeDifference = (newDate.getTime() - oldDate.getTime()) / 1000;
		timeDifference /= 60;
		return Math.abs(Math.round(timeDifference));
	},
	minToHrs: function (timeInMin) {
		return Math.abs(Math.round(timeInMin / 60));
	},
	isTimeLimitAvailable: function (lowerLimit, upperLimit) {
		if (lowerLimit < upperLimit) {
			return true;
		} else {
			return false;
		}
	},
	minuteToMilliseconds: function (minute) {
		return minute * 60000;
	},
	addTimeInMin: function (min) {
		return new Date(Date.now() + this.minuteToMilliseconds(min));
	},
};

const cleanUserModel = function (user) {
	try {
		user = user.toObject();
		if (!_isNull(user.password)) {
			delete user.password;
		}
		if (!_isNull(user.otp)) {
			delete user.otp;
		}
		if (!_isNull(user.otpValidTill)) {
			delete user.otpValidTill;
		}
		return user;
	} catch (e) {
		throw e;
	}
};

const cleanPassword = function (user) {
	try {
		if (!_isNull(user.password)) delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	generateRandomString,
	notNull,
	_isNotEmpty,
	_isNull,
	otpGenrator,
	timeON,
	cleanUserModel,
	cleanPassword,
	hasWhiteSpace,
};
