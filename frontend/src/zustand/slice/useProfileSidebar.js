const useProfileSidebar = (set) => ({
	isProfile: false,
	showProfile: () => set(() => ({ isProfile: true })),
	hideProfile: () => set(() => ({ isProfile: false })),
});

export default useProfileSidebar;
