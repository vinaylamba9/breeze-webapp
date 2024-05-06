export class NetworkInfo {
	// static protocol = "http://";
	// static domain = "localhost:5001";
	static subDomain = "/api";
	static networkInfo = process.env.BREEZE_BACKEND_URL + NetworkInfo.subDomain;
}

export class APIType {
	static USER = "/user";
	static CHAT = "/chat";
	static MESSAGES = "/message";
}
export class MethodType {
	static GET = "/get";
	static POST = "/post";
	static PUT = "/update";
	static DELETE = "/delete";
}
export class UserType {
	static LOGIN = "/login";
	static SIGNUP = "/signup";
	static FORGOTPASSWORD = "/forgotpassword";
	static UPDATEPASSWORD = "/updatepassword";
	static GET_ALL_USERS = "/getall";
	static UPDATE_USER_BY_USERID = "/updateUserByUserID";
	static RESEND_OTP = "/resendOTP";
	static VERIFY_OTP = "/verifyotp";
}

export class ChatType {
	static FETCH_CHAT = "/fetchChat";
	static CREATE_CHAT = "/createChat";
	static CREATE_GROUP_CHAT = "/createGroupChat";
	static RENAME_GROUP_CHAT = "/renameGroupChat";
	static RENAME_GROUP_CHAT_BIO = "/renameGroupChatBio";
	static ADD_MULTIPLE_USERS_TO_GROUP = "/addMultipleToGroup";
	static REMOVE_FROM_GROUP = "/removeFromGroup";
	static UPDATE_GROUP_CHAT_IMAGE = "/updateGroupChatImage";
	static UPDATE_UNREAD_MESSAGE = "/unreadMessage";
}

export class MessageType {
	static CREATE_MSG = "/createMessage";
	static GET_MSG_BY_CHATID = "/getMessageByChatID";
}

export class HTTPStatusCode {
	static OK = 200;
	static CREATED = 201;
	static ACCEPTED = 202;
	static NO_CONTENT = 204;
	static RESET_CONTENT = 205;
	static FOUND = 302;
	static NOT_MODIFIED = 304;
	static BAD_REQUEST = 400;
	static UNAUTHORIZED = 401;
	static FORBIDDEN = 403;
	static NOT_FOUND = 404;
	static REQUEST_TIMEOUT = 408;
	static UNSUPPORTED_MEDIA_TYPE = 415;
	static UNPROCESSABLE_ENTITY = 422;
	static INTERNAL_SERVER_ERROR = 500;
	static BAD_GATEWAY = 502;
}
