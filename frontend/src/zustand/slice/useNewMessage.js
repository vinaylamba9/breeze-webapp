const useNewMessage = (set) => ({
	newMessages: [],
	setNewMessages: (msg) =>
		set(() => ({
			newMessages: msg,
		})),
});

export default useNewMessage;
