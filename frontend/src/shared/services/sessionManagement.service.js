import { SessionType } from "@Constants/application.js";
import { errorDebug } from "@Shared/utils/error.utils.js";
import { BreezeStorageService } from "@Shared/services/secureStorage.service.js";
export const BreezeSessionManagement = {
	/**
	 * @Function setUserSession()
	 * @params {*} userAccount
	 * @returns Write data in Secured Storage
	 */
	setUserSession: function (userAccount) {
		try {
			BreezeStorageService.writeSecuredData({
				key: "userSessionInfo",
				value: userAccount,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setUserSession");
		}
	},

	/**
	 * @Function getUserSession()
	 * @returns SecuredStorage data
	 */
	getUserSession: function () {
		try {
			const data = BreezeStorageService.readSecuredData("userSessionInfo");
			return data && JSON.parse(data);
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getUserSession");
		}
	},

	/**
	 * @Function deleteUserSession()
	 * @returns isSessionDeleted\
	 * @returnType bool
	 */
	deleteUserSession: function () {
		try {
			const isUserSessionDeleted =
				BreezeStorageService.deleteSecuredData("userSessionInfo");
			if (isUserSessionDeleted) this.setSessionStatus(SessionType.EXPIRED);
			return isUserSessionDeleted;
		} catch (error) {
			errorDebug(error, "BreezeSessionManagement.deleteUserSession");
			return false;
		}
	},

	/**
	 * @Function setSessionStatus
	 * @param {*} sessionStatus
	 * @returns Write sessionStatus in Secured Storage
	 */
	setSessionStatus: function (sessionStatus) {
		try {
			BreezeStorageService.writeSecuredData({
				key: "sessionStatus",
				value: sessionStatus,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setSessionStatus");
		}
	},

	/**
	 * @Function getSessionStatus()
	 * @returns sessionStatusData
	 */
	getSessionStatus: function () {
		try {
			const data = BreezeStorageService.readSecuredData("sessionStatus");
			return data && data;
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getSessionStatus");
		}
	},

	/**
	 * @Function setAPIKey()
	 * @param {*} accessKey
	 * @returns Write apiKey data in secured storage
	 */
	setAPIKey: function (accessKey) {
		try {
			BreezeStorageService.writeSecuredData({
				key: "apiKey",
				value: accessKey,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setAPIKey");
		}
	},

	/**
	 * @Function getAPIKey()
	 * @returns apiKey securedStorage Data
	 */
	getAPIKey: function () {
		try {
			const data = BreezeStorageService.readSecuredData("apiKey");
			return data && data;
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getAPIKey");
		}
	},
	/**
	 * @Function deleteAllSession()
	 * @returns delete securedStorage Data
	 */
	deleteAllSession: function () {
		try {
			const res = BreezeStorageService.deleteAllSecuredData();
			return res && res;
		} catch (error) {
			return errorDebug(
				error,
				"UserSessionManagementController.deleteAllSession"
			);
		}
	},
};
