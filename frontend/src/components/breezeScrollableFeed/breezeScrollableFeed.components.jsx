import { useRef, useEffect, useCallback, useState } from "react";
import BreezeChat from "@Components/breezeChat/breezeChat.components";
import useCombinedStore from "@Zustand/store/store";
import useIsMobile from "@Shared/hooks/useMobile";

const BreezeScrollableFeed = ({ showEmojiPicker, setEmojiPicker }) => {
	const chatContainerRef = useRef(null);
	const timeoutRef = useRef(null);
	const [showPill, setShowPill] = useState(false);
	const { selectedChat, newMessages } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
		newMessages: state?.newMessages,
	}));
	const isMobile = useIsMobile();

	useEffect(() => {
		scrollToRecent();
	}, [selectedChat, newMessages]);
	const stickyDateRef = useRef(null);
	const scrollToRecent = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	const onScrollMsg = useCallback(() => {
		if (chatContainerRef.current) {
			const { scrollTop } = chatContainerRef?.current;
			setShowPill(scrollTop > 0);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			// Set a new timeout to hide the pill after 2 seconds
			timeoutRef.current = setTimeout(() => {
				setShowPill(false);
			}, 2000);
		}
	}, []);

	useEffect(() => {
		const localRef = chatContainerRef?.current;
		localRef.addEventListener("scroll", onScrollMsg);
		return () => {
			localRef.removeEventListener("scroll", onScrollMsg);
			// Clear the timeout when the component is unmounted
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [onScrollMsg]);

	return (
		<div
			className='w-full'
			style={{
				backgroundColor: "#F3F4F6 ",
				backgroundSize: "28px 28px",
				maxHeight: showEmojiPicker
					? isMobile
						? "calc(100vh - 465px)"
						: "calc(100vh - 465px)"
					: "calc(100vh - 160px)",
				backgroundPosition: "0 0 28px 28px",
				backgroundImage:
					"radial-gradient(#000000 0.7000000000000001px, #F3F4F6 0.7000000000000001px)",
				height: showEmojiPicker
					? isMobile
						? "calc(100vh - 465px)"
						: "calc(100vh - 465px)"
					: "calc(100vh - 160px)",
			}}>
			<div
				onScroll={onScrollMsg}
				className='w-95% mx-auto overflow-y-auto'
				style={{ maxHeight: "100%" }}
				ref={chatContainerRef}>
				<BreezeChat showPill={showPill} stickyDateRef={stickyDateRef} />
			</div>
		</div>
	);
};

export default BreezeScrollableFeed;
