export const _isNull = function (value) {
	if (value === null || value === undefined || value === "") return true;
	else return false;
};
export const _isNotEmpty = function (value) {
	if (typeof value == "object") {
		if (Array.isArray(value)) {
			if (value != null && value !== undefined && value.length > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (value != null && value !== undefined) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		if (value != null && value !== undefined && value !== "") {
			return true;
		} else {
			return false;
		}
	}
};

export const DATE_UTILS = {
	getHours: (dateTime) => {
		let date = new Date(dateTime);
		date = date.toLocaleString("en-US");
		let splittedValue = date.split(",");

		return splittedValue[1];
	},
	getTodayDate: () => new Date()?.toLocaleDateString("en-US")?.split(",")?.[0],
	getDate: (dateTime) => {
		let date = new Date(dateTime);
		date = date.toLocaleString("en-US");
		let splittedValue = date.split(",");
		return splittedValue[0];
	},
	prefixZeroInTime: (hour) => (hour < 10 ? "0" + hour : hour),
	AMPM: (hours) => (hours >= 12 ? "PM" : "AM"),

	// Convert hours to 12-hour format
	Hours12: (hours) => hours % 12 || 12,
	getTimeInHHMM: (dateTime) =>
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getHours()) +
		":" +
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getMinutes()),
	getTimeInAMPM: (dateTime) =>
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getHours()) +
		":" +
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getMinutes()) +
		" " +
		DATE_UTILS.AMPM(new Date(dateTime)?.getHours()),
	isToday: (date) => {
		const today = new Date();
		const dateFormat = new Date(date);
		return (
			dateFormat?.getDate() === today?.getDate() &&
			dateFormat?.getMonth() === today?.getMonth() &&
			dateFormat?.getFullYear() === today?.getFullYear()
		);
	},
	isYesterday: (date) => {
		const yesterday = new Date();
		const dateFormat = new Date(date);
		yesterday.setDate(yesterday.getDate() - 1);
		return (
			dateFormat?.getDate() === yesterday?.getDate() &&
			dateFormat?.getMonth() === yesterday?.getMonth() &&
			dateFormat?.getFullYear() === yesterday?.getFullYear()
		);
	},
	checkDate: (targetDate) => {
		switch (true) {
			case DATE_UTILS.isToday(targetDate):
				return "TODAY";
			case DATE_UTILS.isYesterday(targetDate):
				return "YESTERDAY";
			default:
				return DATE_UTILS.getDate(targetDate);
		}
	},
};

export const ARRAY_METHODS = {
	isElementExist: (array, ele) => {
		return array?.some((item) => item?.user?.userId === ele);
	},
};
