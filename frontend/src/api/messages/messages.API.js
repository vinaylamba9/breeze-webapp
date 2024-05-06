import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import {
	APIType,
	MessageType,
	MethodType,
	NetworkInfo,
} from "@Constants/network";
import { BreezeHttpService } from "@Shared/services/http.service";
import { errorDebug } from "@Shared/utils/error.utils";
export const MessagesAPI = {
	createMessage: async function (messageDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.MESSAGES +
			MethodType.POST +
			MessageType.CREATE_MSG;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = messageDetails;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "MessagesAPI.createMessage()");
		}
	},
	getMessageByChatID: async function (messageDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.MESSAGES +
			MethodType.GET +
			MessageType.GET_MSG_BY_CHATID +
			`/${messageDetails?.chatID}`;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = messageDetails;
		try {
			let response = await httpCall.sendGetRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "MessagesAPI.getMessageByChatID()");
		}
	},
};
