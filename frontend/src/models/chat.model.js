export default class ChatModel {
	constructor(data) {
		this.chatID = data?._id;
		this.chatTitle = data?.chatTitle;
		this.msg = data?.msg;
		this.profileImage = data?.profileImage;
		this.lastTimeMsg = data?.lastTimeMsg;
		this.isNotification = data?.isNotification;
		this.unreadMessageCount = data?.unreadMessageCount;
		this.isGrouped = data?.isGrouped;
		this.isActive = data?.isActive;
	}

	getChatList(chatList) {
		return chatList?.map((item) => {
			return {
				chatID: item?.chatID,
				chatTitle: item?.chatTitle,
				msg: item?.msg,
				profileImage: item?.profileImage,
				lastTimeMsg: item?.lastTimeMsg,
				isNotification: item?.isNotification,
				unreadMessageCount: item?.unreadMessageCount,
				isGrouped: item?.isGrouped,
				isActive: item?.isActive,
			};
		});
	}
}
