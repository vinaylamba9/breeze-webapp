import { MessagesAPI } from "@API/messages/messages.API";
import { HTTPStatusCode } from "@Constants/network";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const MessageDAO = {
	createMessageDAO: async function (messageDetails) {
		try {
			const createMsgResponse = await MessagesAPI.createMessage(messageDetails);
			if (createMsgResponse) {
				const statusCode = createMsgResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = createMsgResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return createMsgResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return createMsgResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "MessageDAO.createMessageDAO()");
		}
	},
	getMessageByChatID: async function (messageDetails) {
		try {
			const getMsgByChatIDResponse = await MessagesAPI.getMessageByChatID(
				messageDetails
			);
			if (getMsgByChatIDResponse) {
				const statusCode = getMsgByChatIDResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = getMsgByChatIDResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return getMsgByChatIDResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return getMsgByChatIDResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "MessageDAO.getMessageByChatID()");
		}
	},
};
