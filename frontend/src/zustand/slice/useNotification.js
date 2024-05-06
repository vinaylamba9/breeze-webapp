const useNotification = (set) => ({
	notificationList: [],
	setNotification: (notifications) =>
		set(() => ({
			notificationList: notifications,
		})),
});
export default useNotification;
