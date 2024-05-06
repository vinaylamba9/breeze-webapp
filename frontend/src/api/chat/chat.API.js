import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { APIType, ChatType, MethodType, NetworkInfo } from "@Constants/network";
import { BreezeHttpService } from "@Shared/services/http.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatAPI = {
	createChat: async function (userDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.POST +
			ChatType.CREATE_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = userDetails;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createChat()");
		}
	},
	fetchChat: async function (userDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.GET +
			ChatType.FETCH_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = userDetails;
		try {
			let response = await httpCall.sendGetRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.fetchChat()");
		}
	},
	createGroupChat: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.POST +
			ChatType.CREATE_GROUP_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createGroupChat()");
		}
	},
	renameGroupChat: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.RENAME_GROUP_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.renameGroupChat()");
		}
	},
	addMultipleUsersToGroup: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.ADD_MULTIPLE_USERS_TO_GROUP;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.addMultipleUsersToGroup()");
		}
	},
	renameGroupChatBio: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.RENAME_GROUP_CHAT_BIO;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.renameGroupChatBio()");
		}
	},
	removeUserFromGroup: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.REMOVE_FROM_GROUP;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.removeUserFromGroup()");
		}
	},
	updateGroupChatImage: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.UPDATE_GROUP_CHAT_IMAGE;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.updateGroupChatImage()");
		}
	},
	updateUnreadMessage: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.PUT +
			ChatType.UPDATE_UNREAD_MESSAGE;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;

		try {
			let response = await httpCall.sendPutRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.updateUnreadMessage()");
		}
	},
};
