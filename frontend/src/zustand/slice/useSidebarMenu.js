const useSidebarMenu = (set) => ({
	isSideMenu: false,
	showSidebarMenu: () => set(() => ({ isSideMenu: true })),
	hideSidebarMenu: () => set(() => ({ isSideMenu: false })),
});

export default useSidebarMenu;
