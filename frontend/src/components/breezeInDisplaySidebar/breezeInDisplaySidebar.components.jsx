import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import useCombinedStore from "@Zustand/store/store";
import BreezeSelfProfile from "@Components/breezeSelfProfile/breezeSelfProfile.components";
const BreezeInDisplaySidebar = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
}) => {
	const { isProfile, selectedChat } = useCombinedStore((state) => ({
		isProfile: state?.isProfile,
		selectedChat: state?.selectedChat,
	}));
	return (
		<aside>
			{isProfile ? (
				<BreezeSelfProfile
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
					// onClose={() => setProfile(false)}
				/>
			) : selectedChat?.isGroupChat ? (
				<BreezeGroupProfile
					onClose={() => setSelectedChatProfile(false)}
					setSelectedChatProfile={setSelectedChatProfile}
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
			) : (
				<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
			)}
		</aside>
	);
};

export default BreezeInDisplaySidebar;
