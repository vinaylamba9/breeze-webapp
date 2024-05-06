import { errorDebug } from "@Shared/utils/error.utils.js";

export const BreezeStorageService = {
	readSecuredData: function (key) {
		try {
			const result = localStorage.getItem(key);
			return result;
		} catch (error) {
			return errorDebug(error, "BreezeStorageService.readSecuredData");
		}
	},
	writeSecuredData: function (securedData) {
		try {
			localStorage.setItem(securedData.key, securedData.value);
		} catch (error) {
			return errorDebug(error, "BreezeStorageService.writeSecuredData");
		}
	},
	deleteSecuredData: function (key) {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			errorDebug(error, "BreezeStorageService.deleteSecuredData");
			return false;
		}
	},
	deleteAllSecuredData: function () {
		try {
			localStorage.clear();
			return true;
		} catch (error) {
			errorDebug(error, "BreezeStorageService.deleteAllSecureData");
			return false;
		}
	},
};
