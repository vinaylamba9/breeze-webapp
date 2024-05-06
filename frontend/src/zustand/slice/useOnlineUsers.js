const useOnlineUsers = (set) => ({
	onlineUsers: [],
	setOnlineUsers: (users) =>
		set(() => ({
			onlineUsers: users,
		})),
});
export default useOnlineUsers;
