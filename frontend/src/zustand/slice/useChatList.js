const useChat = (set) => ({
	chatList: [],
	setChatList: (updatedChat) => set(() => ({ chatList: updatedChat })),
	clearChatList: () => set(() => ({ chatList: [] })),
});

export default useChat;
