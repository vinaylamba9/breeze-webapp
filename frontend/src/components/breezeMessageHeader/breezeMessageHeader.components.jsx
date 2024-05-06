import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import useCombinedStore from "@Zustand/store/store";
import { ARRAY_METHODS } from "@/shared/utils/basic.utils";
import { useMemo } from "react";
import useIsMobile from "@Shared/hooks/useMobile";
import { IoArrowBack } from "react-icons/io5";
const BreezeMessageHeader = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
	isTyping,
}) => {
	const isMobile = useIsMobile();
	const {
		showActive,
		isActive,
		onlineUsers,
		hideSidebarMenu,
		hideActive,
		clearSelectedChat,
		loggedInUser,
		selectedChat,
	} = useCombinedStore((state) => ({
		isActive: state?.isActive,
		showActive: state?.showActive,
		hideSidebarMenu: state?.hideSidebarMenu,
		hideActive: state?.hideActive,
		isSideMenu: state?.isSideMenu,
		clearSelectedChat: state?.clearSelectedChat,
		loggedInUser: state?.loggedInUser,
		selectedChat: state?.selectedChat,
		onlineUsers: state?.onlineUsers,
	}));

	const getFiveUserFromGroupAt = useMemo(() => {
		if (selectedChat?.users?.length <= 5) {
			return (
				selectedChat?.users?.map((item) =>
					item?._id === loggedInUser?.userId ? "You" : item?.name?.split(" ")[0]
				) + "  "
			);
		} else {
			const topFive = selectedChat?.users?.slice(0, 5);
			return (
				topFive?.map((item) =>
					item?._id === loggedInUser?.userId ? "You" : item?.name?.split(" ")[0]
				) + " "
			);
		}
	}, [selectedChat, loggedInUser]);

	return (
		<div className=' transition-all duration-300 ease-in-out  border w-100% bg-white  rounded-bl rounded-br text-black'>
			<div className='w-98%  mx-auto flex items-center justify-start  py-4'>
				{isMobile && selectedChat ? (
					<div
						className='p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 mr-2 '
						onClick={() => {
							hideSidebarMenu();
							clearSelectedChat();
						}}>
						<IoArrowBack
							style={{
								color: `var(--background-color-black)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
				) : null}
				<div
					className='flex items-center gap-2 justify-start cursor-pointer w-70%'
					onClick={isActive ? hideActive : showActive}>
					{isActive && isMobile ? null : (
						<BreezeAvatar
							title={
								selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											loggedInUser,
											selectedChat?.users
									  )
							}
							isActive={ARRAY_METHODS.isElementExist(
								onlineUsers,
								CHAT_UTILS.getOtherSideUserID(loggedInUser, selectedChat?.users)
							)}
							isGrouped={selectedChat?.isGroupChat}
							profileImage={
								selectedChat?.isGroupChat
									? selectedChat?.groupImage
									: CHAT_UTILS?.getOtherSideProfileImage(
											loggedInUser,
											selectedChat?.users
									  )
							}
						/>
					)}
					<div className='flex flex-col justify-start items-start'>
						<h1 className='text-fontsize-brittle uppercase font-medium'>
							{selectedChat?.isGroupChat
								? selectedChat?.chatName
								: CHAT_UTILS?.getOtherSideUserName(
										loggedInUser,
										selectedChat?.users
								  )}
						</h1>
						<span>
							{selectedChat?.isGroupChat && !isTyping ? (
								<p className='text-fontsize-pool text-gray-500'>
									{getFiveUserFromGroupAt}{" "}
									{selectedChat?.users?.length > 5 ? (
										<span className='text-black font-medium'>{` 	+${
											selectedChat?.users?.length - 5
										} more`}</span>
									) : null}
								</p>
							) : null}
							{!selectedChat?.isGroupChat ? (
								ARRAY_METHODS.isElementExist(
									onlineUsers,
									CHAT_UTILS.getOtherSideUserID(
										loggedInUser,
										selectedChat?.users
									)
								) ? (
									<span className='  px-2 py-0.5 bg-green-500 rounded-xl font-medium text-white text-xs	'>
										Online
									</span>
								) : (
									<span className='  px-2 py-0.5 bg-gray-500 rounded-xl font-medium text-white text-xs	'>
										Offline
									</span>
								)
							) : null}

							{isTyping && (
								<span className='transition ease-in-out duration-300  text-green-500 text-sm'>
									Typing ...
								</span>
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreezeMessageHeader;
