import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service.js";

export const ProtectedRoutes = ({ Component }) => {
	const navigate = useNavigate();
	const checkStatus = useCallback(async () => {
		let login = BreezeSessionManagement.getAPIKey();
		if (!login || login === null) {
			let deletedResponse = BreezeSessionManagement.deleteAllSession();
			if (deletedResponse) {
				navigate(BreezeRoutes.SIGNUPROUTE);
			}
		}
	}, [navigate]);
	useEffect(() => {
		checkStatus();
	}, [checkStatus]);
	return <Component />;
};
