import { useEffect, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";
import { socket } from "@Socket/socket";
import BreezeScrollableFeed from "@Components/breezeScrollableFeed/breezeScrollableFeed.components";
import useCombinedStore from "@/zustand/store/store";

const BreezeChatBox = ({
	fetchAgain,
	isSelectedChatProfile,
	setSelectedChatProfile,
	setFetchAgain,
	setTyping,
	setIsTyping,
	typing,
	isTyping,
}) => {
	const { selectedChat } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
	}));
	const [prevChat, setPrevChat] = useState(selectedChat);
	const [showEmojiPicker, setEmojiPicker] = useState(false);

	useEffect(() => {
		socket.on("typing", (val) => {
			setIsTyping(true);
		});
		socket.on("stopTyping", (val) => setIsTyping(false));

		return () => {
			socket.off("typing");
			socket.off("stopTyping");
		};
	}, [setIsTyping]);

	return (
		<div className='h-screen bg-white'>
			<BreezeMessageHeader
				isSelectedChatProfile={isSelectedChatProfile}
				setSelectedChatProfile={setSelectedChatProfile}
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
				isTyping={isTyping}
			/>
			<BreezeScrollableFeed
				setEmojiPicker={setEmojiPicker}
				showEmojiPicker={showEmojiPicker}
				prevChat={prevChat}
				isTyping={isTyping}
			/>
			<BreezeMessageFields
				setEmojiPicker={setEmojiPicker}
				showEmojiPicker={showEmojiPicker}
				prevChat={prevChat}
				setIsTyping={setIsTyping}
				typing={typing}
				setTyping={setTyping}
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
			/>
		</div>
	);
};

export default BreezeChatBox;
