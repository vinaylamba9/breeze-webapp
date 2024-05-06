const useSelectUserFromGroup = (set) => ({
	selectUserFromGroup: null,
	setSelectUserFromGroup: (updatedUser) =>
		set(() => ({ selectUserFromGroup: updatedUser })),
	clearUserFromGroup: () => set(() => ({ selectUserFromGroup: null })),
});

export default useSelectUserFromGroup;
