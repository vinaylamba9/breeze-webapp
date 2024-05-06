const useSelectedChat = (set) => ({
	selectedChat: null,
	setSelectedChat: (updatedChat) => set(() => ({ selectedChat: updatedChat })),
	clearSelectedChat: () => set(() => ({ selectedChat: null })),
});

export default useSelectedChat;
