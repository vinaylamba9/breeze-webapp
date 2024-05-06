import { ChatAPI } from "@API/chat/chat.API";
import { HTTPStatusCode } from "@Constants/network";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatDAO = {
	createChatDAO: async function (userDetails) {
		try {
			const createChatResponse = await ChatAPI.createChat(userDetails);
			if (createChatResponse) {
				const statusCode = createChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = createChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return createChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return createChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.createChatDAO()");
		}
	},
	fetchChatDAO: async function (userDetails) {
		try {
			const fetchChatResponse = await ChatAPI.fetchChat(userDetails);
			if (fetchChatResponse) {
				const statusCode = fetchChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = fetchChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return fetchChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return fetchChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.fetchChatDAO()");
		}
	},
	createGroupChatDAO: async function (groupChatDetails) {
		try {
			const createGroupChatResponse = await ChatAPI.createGroupChat(
				groupChatDetails
			);
			if (createGroupChatResponse) {
				const statusCode = createGroupChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = createGroupChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return createGroupChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return createGroupChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.createGroupChatDAO()");
		}
	},
	renameGroupChatDAO: async function (groupChatDetails) {
		try {
			const renameGroupChatResponse = await ChatAPI.renameGroupChat(
				groupChatDetails
			);
			if (renameGroupChatResponse) {
				const statusCode = renameGroupChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = renameGroupChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return renameGroupChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return renameGroupChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.renameGroupChatDAO()");
		}
	},
	renameGroupChatBioDAO: async function (groupChatDetails) {
		try {
			const renameGroupChatBioResponse = await ChatAPI.renameGroupChatBio(
				groupChatDetails
			);
			if (renameGroupChatBioResponse) {
				const statusCode = renameGroupChatBioResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = renameGroupChatBioResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return renameGroupChatBioResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return renameGroupChatBioResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.renameGroupChatBioDAO()");
		}
	},
	updateGroupChatImageDAO: async function (groupChatDetails) {
		try {
			const response = await ChatAPI.updateGroupChatImage(groupChatDetails);
			if (response) {
				const statusCode = response["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = response.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return response;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return response;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.updateGroupChatImageDAO()");
		}
	},
	updateUnreadMessageDAO: async function (groupChatDetails) {
		try {
			const response = await ChatAPI.updateUnreadMessage(groupChatDetails);
			if (response) {
				const statusCode = response["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = response.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return response;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return response;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.updateUnreadMessageDAO()");
		}
	},
	addMultipleUsersToGroupDAO: async function (groupChatDetails) {
		try {
			const response = await ChatAPI.addMultipleUsersToGroup(groupChatDetails);
			if (response) {
				const statusCode = response["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = response.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return response;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return response;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.addMultipleUsersToGroupDAO()");
		}
	},
	removeUserFromGroupDAO: async function (groupChatDetails) {
		try {
			const removedUserFromGroupResponse = await ChatAPI.removeUserFromGroup(
				groupChatDetails
			);
			if (removedUserFromGroupResponse) {
				const statusCode = removedUserFromGroupResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = removedUserFromGroupResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return removedUserFromGroupResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return removedUserFromGroupResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.removeUserFromGroupDAO()");
		}
	},
};
