import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
const useLoggedInUser = (set) => ({
	loggedInUser: BreezeSessionManagement.getUserSession(),
	setUserDetails: (updatedDetails) =>
		set(() => ({ loggedInUser: updatedDetails })),
	clearLoggedInUser: () => set(() => ({ loggedInUser: null })),
});

export default useLoggedInUser;
