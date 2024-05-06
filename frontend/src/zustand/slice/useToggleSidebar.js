const useToggleSidebarSlice = (set) => ({
	isActive: false,
	showActive: () => set(() => ({ isActive: true })),
	hideActive: () => set(() => ({ isActive: false })),
});

export default useToggleSidebarSlice;
