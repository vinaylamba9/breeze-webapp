export const CHAT_UTILS = {
	getOtherSideUserID: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?._id
			: users?.[0]?._id,
	getOtherSideUserName: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.name
			: users?.[0]?.name,
	getOtherSideProfileImage: (loggedInUser, users) => {
		if (users?.length > 0)
			return users?.[0]?._id === loggedInUser?.userId
				? users?.[1]?.profileImage
				: users?.[0]?.profileImage;
		else return users;
	},
	getOtherSideProfileEmail: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.email
			: users?.[0]?.email,
	getOtherSideProfileBio: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.bio
			: users?.[0]?.bio,
	isSameSenderOfMsg: (messages, m, i, userID) => {
		return (
			messages?.[i - 1]?.sender?._id !== m?.sender?._id &&
			messages?.[i]?.sender?._id !== userID
		);
	},
	isFirstMessages: (messages, i, userID) => {
		return (
			messages?.[messages?.length - 1]?.sender?._id !== userID &&
			messages?.[messages?.length - 1]?.sender?._id !==
				messages?.[messages?.length - 2]?.sender?._id
		);
	},
	isLastMessages: (messages, i, userID) => {
		return (
			i === messages?.length - 1 &&
			messages?.[messages?.length - 1]?.sender?._id !== userID
		);
	},
	msgMargin: (messages, msg, i, userID) => {
		return msg?.sender?._id === userID
			? "auto"
			: !CHAT_UTILS?.isSameSenderOfMsg(messages, msg, i, userID) &&
			  msg?.chat?.isGroupChat
			? 44
			: 0;
	},
	isSameUser: (messages, m, i) => {
		return i > 0 && messages?.[i - 1]?.sender?._id === m?.sender?._id;
	},
};
