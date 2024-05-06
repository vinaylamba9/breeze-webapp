const useBreezeGPT = (set) => ({
	isBreezeGPT: false,
	showBreezeGPT: () => set(() => ({ isBreezeGPT: true })),
	hideBreezeGPT: () => set(() => ({ isBreezeGPT: false })),
});

export default useBreezeGPT;
