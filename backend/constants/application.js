class AccountStatus {
	static ACTIVE = 0;
	static DELETED = 1;
	static DISABLED = 2;
}

Object.freeze(AccountStatus);
class RegEx {
	static OBJECT_ID = /^[0-9a-fA-F]{24}$/;
}
Object.freeze(RegEx);
class AccountInitFrom {
	static SELF = 0;
	static GOOGLE = 1;
}
Object.freeze(AccountInitFrom);
class AccountLoggedStatus {
	static LOGIN = 0;
	static LOGOUT = 1;
	static SIGNUP = 2;
}
Object.freeze(AccountLoggedStatus);

const TimeInMs = {
	H24: 24 * (60 * (60 * 1000)),
	MIN5: 5 * (60 * 1000),
};

class VerificationType {
	static ACCOUNT_VERIFICATION = 0;
	static FORGOT_PASSWORD = 1;
}
Object.freeze(VerificationType);
class MasterConstantsStatus {
	static ACTIVE = 0;
	static DELETED = 1;
}
Object.freeze(MasterConstantsStatus);

class MasterConstantsCategory {
	static USERACCOUNTS = 0;
}

Object.freeze(MasterConstantsCategory);

class OTPExpired {
	static EXPIREDVALUE = -1000;
	static TOKENVALIDTILL = 0;
}

Object.freeze(OTPExpired);

module.exports = {
	AccountStatus,
	RegEx,
	AccountLoggedStatus,
	AccountInitFrom,
	VerificationType,
	TimeInMs,
	MasterConstantsStatus,
	MasterConstantsCategory,
	OTPExpired,
};
