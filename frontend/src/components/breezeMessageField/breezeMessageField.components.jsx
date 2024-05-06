import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineEmojiEmotions, MdSend } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { socket } from "@Socket/socket";
import useCombinedStore from "@Zustand/store/store";
import BreezeEmojiPicker from "@Components/breezeEmojiPicker/breezeEmojiPicker";
import useIsMobile from "@Shared/hooks/useMobile";
import BreezeDropdown from "@Components/breezeDropdown/breezeDropdown.components";
import {
	AttachementsMenuType,
	msgAttachementsDropdown,
} from "@Constants/application";
import { motion } from "framer-motion";
import { MediaHandler } from "@/shared/utils/media_handler.utils";
const BreezeMessageFields = ({
	prevChat,
	typing,
	setTyping,
	showEmojiPicker,
	setEmojiPicker,
}) => {
	const [imageAttachements, setImageAttachements] = useState();
	const [isRotatedAttachements, setIsRotatedAttachements] = useState(false);
	const { selectedChat, isActive, isProfile } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
		isActive: state?.isActive,
		isProfile: state?.isProfile,
	}));
	const [message, setMessage] = useState(null);
	const toggleEmojiPicker = () => {
		setEmojiPicker(!showEmojiPicker);
	};
	const isMobile = useIsMobile();
	const msgBoxRef = useRef(null);
	const typingIndicatorHandler = useCallback(
		(e) => {
			if (message?.length === 0) {
				socket.emit("stopTyping", selectedChat?._id);
				setTyping(false);
			}
			if (!typing && message?.length > 0) {
				setTyping(true);
				socket.emit("typing", selectedChat?._id);
			}

			let lastTypingTime = new Date().getTime();
			const timer = 5000;
			setTimeout(() => {
				let currentTime = new Date().getTime();
				if (currentTime - lastTypingTime >= timer && typing) {
					socket.emit("stopTyping", selectedChat?._id);
					setTyping(false);
				}
			}, timer);
		},
		[message?.length, selectedChat?._id, setTyping, typing]
	);

	const sendMessageHandler = useCallback(
		async (e) => {
			// let msg = e?.target?.innerText;
			if (message?.trim()?.length === 0 && e?.which === 13) {
				e?.preventDefault();
				return;
			}
			if (!e?.shiftKey && e?.which === 13 && message?.length > 0) {
				e.preventDefault();
				setEmojiPicker(false);
				socket.emit("stopTyping", selectedChat?._id);
				e.target.innerText = "";
				setMessage(null);

				socket.emit("sendMessage", {
					content: message?.replace(/\s+\n/g, "\n").trim(),
					chatID: selectedChat?._id,
				});
			} else typingIndicatorHandler(e);
		},
		[message, setEmojiPicker, selectedChat?._id, typingIndicatorHandler]
	);
	const sendMessageOnMobile = useCallback(
		async (e) => {
			if (message?.trim()?.length === 0) {
				e?.preventDefault();
				return;
			}
			if (message?.length > 0) {
				setEmojiPicker(false);
				e.preventDefault();
				socket.emit("stopTyping", selectedChat?._id);
				e.target.innerText = "";
				setMessage(null);

				socket.emit("sendMessage", {
					content: message,
					chatID: selectedChat?._id,
				});
			} else typingIndicatorHandler(e);
		},
		[message, setEmojiPicker, selectedChat?._id, typingIndicatorHandler]
	);

	useEffect(() => {
		let tempRef = msgBoxRef.current;
		prevChat !== selectedChat && (tempRef.innerText = "");
	}, [prevChat, selectedChat]);

	useEffect(() => {
		!isMobile && msgBoxRef.current.focus();
	}, [msgBoxRef, isMobile, selectedChat]);

	useEffect(() => {
		return () => socket.off("sendMessage");
	}, []);

	return (
		<>
			{showEmojiPicker && (
				<span className='transition ease-in-out duration-300 w-100% bg-transparent  text-sm'>
					<BreezeEmojiPicker
						message={message}
						setMessage={setMessage}
						theme={"light"}
						msgBoxRef={msgBoxRef}
					/>
				</span>
			)}
			<div
				className={` transition-all duration-300 ease-in-out  bg-white rounded-md  pt-2 pb-3 absolute bottom-0 ${
					isMobile
						? "w-100%"
						: isActive || isProfile
						? " w-48.5 xl:w-48.6%"
						: "sm:w-0% xs:w-0% md:w-0% lg:w-69% xl:w-71% w-71%"
				} `}>
				<div className=' w-98% mx-auto flex justify-start items-start gap-2'>
					<div
						className={`rounded-full ${showEmojiPicker ? "bg-gray-200" : ""} `}
						onClick={toggleEmojiPicker}>
						<motion.div
							transition={{
								duration: 0,
								ease: "easeIn",
								type: "spring",
							}}
							animate={{ rotate: showEmojiPicker ? 135 : 0 }}
							initial={{ rotate: 0 }}
							exit={{ rotate: 0 }}
							className='p-3 cursor-pointer ease-in-out duration-300'>
							{!showEmojiPicker ? (
								<MdOutlineEmojiEmotions className='text-gray-900   text-fontsize-trim' />
							) : (
								<BsPlusLg className='text-gray-900  text-fontsize-trim' />
							)}
						</motion.div>
					</div>
					<div
						onClick={() => setIsRotatedAttachements(!isRotatedAttachements)}
						className={`rounded-full ${
							isRotatedAttachements ? "bg-gray-200" : ""
						} `}>
						<BreezeDropdown
							isUploadFile={true}
							isAnimation={isRotatedAttachements}
							setIsAnimation={setIsRotatedAttachements}
							listItems={msgAttachementsDropdown}
							menuAction={(e, key) => {
								switch (key) {
									case AttachementsMenuType.PHOTOS_VIDEOS: {
										// setImageAttachements(true);
										// MediaHandler.uploadImageVideo(e);
										console.log("hello");
										return;
									}
									default:
										break;
								}
							}}
							width={"w-52"}
							direction={"bottom"}
							isIcon={true}
							children={
								<motion.div
									transition={{
										duration: 0,
										ease: "easeIn",
										type: "spring",
									}}
									animate={{ rotate: isRotatedAttachements ? 135 : 0 }}
									initial={{ rotate: 0 }}
									exit={{ rotate: 0 }}
									className='p-3 cursor-pointer ease-in-out duration-300'>
									<BsPlusLg
										className={`${"text-gray-900"} text-fontsize-trim font-bold `}
									/>
								</motion.div>
							}
						/>
					</div>
					<div
						ref={msgBoxRef}
						id='messageBox'
						style={{
							wordBreak: "break-word",
							minHeight: "40px",
							maxHeight: "70px",
							userSelect: "text",
						}}
						onInput={(e) => setMessage(e?.target?.innerText)}
						onKeyDown={!isMobile ? sendMessageHandler : null}
						className='bg-gray-100 text-md w-100%  rounded-xl 
						mx-auto px-4 py-3 overflow-y-auto text-gray-900 '
						contentEditable
						suppressContentEditableWarning
						placeholder={
							msgBoxRef?.current?.innerText?.length === 0 && "Type a message"
						}
						title='Type a message'
						tabIndex={10}
						spellCheck></div>
					<div className={` mx-1 cursor-pointer text-center flex items-end`}>
						<div
							className='p-3 rounded-full bg-gray-200 cursor-pointer ease-in-out duration-300 '
							onClick={sendMessageOnMobile}>
							<MdSend
								style={{
									color: `var(--background-color-black)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BreezeMessageFields;
