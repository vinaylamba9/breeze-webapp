import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { io } from "socket.io-client";

const URL = process.env.BREEZE_BACKEND_URL;

export const socket = io(URL, {
	autoConnect: true,
	forceBase64: true,

	extraHeaders: {
		Authorization: BreezeSessionManagement.getAPIKey(),
	},
	// forceNew: true,
	reconnection: true,
	reconnectionAttempts: Infinity,
});
