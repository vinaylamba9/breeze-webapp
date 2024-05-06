import React, { useEffect, useState, useRef, useCallback } from "react";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { ARRAY_METHODS, DATE_UTILS } from "@Shared/utils/basic.utils";
import useCombinedStore from "@Zustand/store/store";
import { socket } from "@Socket/socket";
import { CHAT_UTILS } from "@/shared/utils/chat.utils";

const BreezeChat = ({ showPill }) => {
	const {
		loggedInUser,
		selectedChat,
		onlineUsers,
		setNewMessages,
		newMessages,
	} = useCombinedStore((state) => ({
		loggedInUser: state?.loggedInUser,
		selectedChat: state?.selectedChat,
		setNewMessages: state?.setNewMessages,
		newMessages: state?.newMessages,
		onlineUsers: state?.onlineUsers,
	}));

	const msgDividerComponent = (msg) => {
		return (
			<div className='flex justify-center items-center w-90% mx-auto gap-4'>
				<div className='  text-xs  mx-auto date-sticky bg-gray-500 px-3 rounded-2xl text-center drop-shadow-md  tracking-wider text-white  py-1.5  top-3  z-10'>
					{DATE_UTILS?.checkDate(msg?.createdAt)}
				</div>
			</div>
		);
	};

	const usersMsgFilter = useCallback(
		(msg, index) =>
			CHAT_UTILS?.isSameSenderOfMsg(
				newMessages,
				msg,
				index,
				loggedInUser?.userId
			) &&
			selectedChat?.isGroupChat && (
				<BreezeAvatar
					title={msg?.sender?.name}
					isActive={ARRAY_METHODS.isElementExist(onlineUsers, msg?.sender?._id)}
					// onClickHandler={() => setSelectedChatProfile(true)}
				/>
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[loggedInUser?.userId, newMessages, onlineUsers]
	);

	useEffect(() => {
		socket.on("roomMessage", (roomMessage) => {
			setNewMessages(roomMessage);
		});
		return () => socket.off("roomMessage");
	}, [setNewMessages]);

	return (
		<div>
			{/* <div
				className={`mt-5% w-10% rounded-md text-sm mx-auto date-sticky drop-shadow-md text-center  bg-white p-2  sticky top-3  z-50  ease-in-out duration-300 transition-all  ${
					showPill ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
				}`}>
				{currentDate}
			</div> */}
			<div>
				{newMessages?.length > 0 &&
					newMessages?.map((msg, index) => (
						<div key={`msg_${index}`}>
							{index === 0 && msgDividerComponent(msg)}
							{index > 0 &&
								DATE_UTILS?.getDate(newMessages?.[index]?.createdAt) !==
									DATE_UTILS?.getDate(newMessages?.[index - 1]?.createdAt) &&
								msgDividerComponent(msg)}
							<div
								className='flex gap-2 items-center justify-start '
								key={index}>
								<div>{usersMsgFilter(msg, index)}</div>
								<div
									style={{
										maxWidth: "75%",
										marginLeft: CHAT_UTILS?.msgMargin(
											newMessages,
											msg,
											index,
											loggedInUser?.userId
										),
										marginTop: CHAT_UTILS?.isSameUser(newMessages, msg, index)
											? 10
											: 10,
									}}
									className={` ${
										msg?.sender?._id === loggedInUser?.userId
											? "bg-[#fafaf9] text-black shadow"
											: "bg-gray-800 text-white shadow"
									}  rounded-2xl px-5 py-2 mb-2`}>
									<div className='flex justify-between items-start gap-3'>
										<div className='text-sm w-90% whitespace-pre-wrap'>
											{msg?.content}
										</div>
										<div
											className={`text-xs self-end ${
												msg?.sender?._id === loggedInUser?.userId
													? "text-black"
													: "text-white"
											} pt-3`}>
											{DATE_UTILS?.getTimeInHHMM(msg?.createdAt)}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default BreezeChat;
