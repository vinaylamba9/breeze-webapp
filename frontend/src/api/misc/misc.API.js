import { BreezeHttpService } from "@Shared/services/http.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const MiscAPI = {
	uploadImage: async (data) => {
		let httpCall = new BreezeHttpService();
		httpCall.URL = process.env.REACT_APP_APICLOUDINARYURL?.toString();
		httpCall.dataToSend = data;
		try {
			let response = await httpCall.sendUploadImagePostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createChat()");
		}
	},
};
