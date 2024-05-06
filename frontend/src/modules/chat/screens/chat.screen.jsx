import { useCallback, useState, useEffect, useMemo, Fragment } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeSideDrawerBody from "@Components/breezeSidedrawer/breezeSidedrawerBody.components";
import { HTTPStatusCode } from "@Constants/network";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import ChatNotFound from "@Modules/misc/screens/chatNotFound.screen";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import BreezeGroupChat from "@Components/breezeGroupChat/breezeGroupChat.components";
import { ChatDAO } from "../core/chatDAO";
import BreezeChatBox from "@Components/breezeChatBox/breezeChatBox.components";
import { socket } from "@Socket/socket";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";
import useCombinedStore from "@Zustand/store/store";
import BreezeInDisplaySidebar from "@Components/breezeInDisplaySidebar/breezeInDisplaySidebar.components";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { ARRAY_METHODS, DATE_UTILS } from "@Shared/utils/basic.utils";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import useIsMobile from "@Shared/hooks/useMobile";
import BreezeGPTApp from "BreezeGPT/BreezeGPTApp";

const ChatScreen = () => {
	const [isGroupChatModal, setGroupChatModal] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [fetchAgain, setFetchAgain] = useState(false);
	const [isSelectedChatProfile, setSelectedChatProfile] = useState(false);
	const [socketConnection, setSocketConnection] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [searchChat, setSearchChat] = useState([]);
	const isMobile = useIsMobile();
	const {
		setUserDetails,
		clearUserFromGroup,
		chatList,
		clearChatList,
		setChatList,
		loggedInUser,
		isActive,
		selectedChat,
		setSelectedChat,
		clearSelectedChat,
		showSidebarMenu,
		hideSidebarMenu,
		isSideMenu,
		setNewMessages,
		newMessages,
		isProfile,
		hideProfile,
		onlineUsers,
		setOnlineUsers,
		isBreezeGPT,
		showBreezeGPT,
		hideBreezeGPT,
	} = useCombinedStore((state) => ({
		isSideMenu: state?.isSideMenu,
		showSidebarMenu: state?.showSidebarMenu,
		hideSidebarMenu: state?.hideSidebarMenu,
		clearUserFromGroup: state?.clearUserFromGroup,
		chatList: state?.chatList,
		setChatList: state?.setChatList,
		clearChatList: state?.clearChatList,
		loggedInUser: state?.loggedInUser,
		isProfile: state?.isProfile,
		isActive: state?.isActive,
		hideProfile: state?.hideProfile,
		setUserDetails: state?.setUserDetails,
		selectedChat: state?.selectedChat,
		setSelectedChat: state?.setSelectedChat,
		clearSelectedChat: state?.clearSelectedChat,
		setNewMessages: state?.setNewMessages,
		newMessages: state?.newMessages,
		onlineUsers: state?.onlineUsers,
		setOnlineUsers: state?.setOnlineUsers,
		isBreezeGPT: state?.isBreezeGPT,
		showBreezeGPT: state?.showBreezeGPT,
		hideBreezeGPT: state?.hideBreezeGPT,
	}));

	const { register } = useForm({});

	const [isSidebar, setSidebar] = useState(false);

	const openSideBar = () => {
		setSidebar(true);
	};

	const closeSideBar = () => {
		setSidebar(false);
	};

	const openGroupModal = () => {
		setGroupChatModal(true);
		setSidebar(false);
	};
	const closeGroupModal = () => {
		setGroupChatModal(false);
	};

	const onFetchChatHandler = useCallback(async () => {
		setLoading(true);
		const response = await ChatDAO.fetchChatDAO(loggedInUser?.userId);
		if (response?.statusCode === HTTPStatusCode.OK) {
			setChatList(response?.responseBody);
		} else clearChatList();
		setLoading(false);
	}, [clearChatList, loggedInUser?.userId, setChatList]);

	const onChangeChatsHandler = useCallback(
		(item) => {
			hideProfile();
			isMobile && hideSidebarMenu();
			clearUserFromGroup();
			socket.emit("joinChat", {
				chatID: item?._id,
			});
			item?.unreadMessage?.length > 0 &&
				socket.emit("checkUnreadMessage", {
					chatID: item?._id,
					loggedInID: loggedInUser?.userId,
				});
			setSelectedChat(item);
		},
		[
			hideProfile,
			isMobile,
			hideSidebarMenu,
			clearUserFromGroup,
			setSelectedChat,
			loggedInUser?.userId,
		]
	);

	/** -------- Chat Search Start --------------- */
	/**
	 * @Function (onSearchChat)
	 * @param {*} e:any
	 * @returns {} It will search on the name field and returns the filtered Value.
	 */

	const onSearchChat = (e) => {
		let filteredData = chatList?.filter((item) => {
			const name = item?.isGroupChat
				? item?.chatName
				: CHAT_UTILS?.getOtherSideUserName(loggedInUser, item?.users);
			return name?.toLowerCase()?.includes(e.target.value.toLowerCase());
		});
		setSearchChat([...filteredData]);
	};

	const searchedMemo = useMemo(
		() => (searchChat && searchChat?.length > 0 ? searchChat : chatList),
		[chatList, searchChat]
	);
	/** -------- Chat Search End --------------- */

	/**------- Chat notification starts --------- */
	const unreadMessageCountHandler = useCallback(
		(item) => {
			const count = item?.unreadMessage?.filter((msg) => {
				return msg === loggedInUser?.userId && msg;
			});
			return selectedChat?._id !== item?._id ? count?.length : 0;
		},
		[loggedInUser?.userId, selectedChat]
	);

	const clearUnreadMessage = useCallback(
		(item) => {
			const indexOfUnreadMsg = chatList?.findIndex(
				(chat) => chat?._id === item?._id
			);
			if (!!chatList?.length > 0 && !!chatList[indexOfUnreadMsg]?.unreadMessage)
				chatList[indexOfUnreadMsg].unreadMessage = [];
		},
		[chatList]
	);

	const handleReceivedMessage = useCallback(
		(newMsgReceived) => {
			if (
				selectedChat &&
				newMsgReceived &&
				selectedChat._id !== newMsgReceived.chat._id
			) {
				console.log("Not in the chat, sending unread message notification");
				socket.emit("sendUnreadMessageNotification", newMsgReceived);
			} else {
				console.log("In the chat, updating new messages");
				setNewMessages([...newMessages, newMsgReceived]);
			}
		},
		[selectedChat, newMessages, setNewMessages]
	);

	useEffect(() => {
		socket.on("getMessage", (newMsgReceived) => {
			handleReceivedMessage(newMsgReceived);
		});

		return () => {
			socket.off("getMessage");
		};
	}, [handleReceivedMessage, newMessages, setNewMessages]);

	useEffect(() => {
		socket.on("clearUnreadMessage", (unreadMessageResponse) => {
			clearUnreadMessage(unreadMessageResponse);
		});

		return () => {
			socket.off("clearUnreadMessage");
		};
	}, [clearUnreadMessage]);

	/**------- Chat notification Ends --------- */

	useEffect(() => {
		onFetchChatHandler();
	}, [onFetchChatHandler]);

	useEffect(() => {
		const getUserDetails = BreezeSessionManagement.getUserSession();
		setUserDetails(getUserDetails);
	}, [setUserDetails]);
	useEffect(() => {
		socket.connect();
		socket.on("connected", (callback) => {
			callback();
			setSocketConnection(true);
		});
		socket.on("onlineUsers", (users) => {
			setOnlineUsers([...users]);
		});

		return () => {
			socket.disconnect();
			socket.off("connected");
			socket.off("onlineUsers");
		};
	}, [loggedInUser, setOnlineUsers]);

	useEffect(() => {
		socket.on("fetchChats", (chatByID) => {
			setChatList(chatByID);
		});
		return () => socket.off("fetchChats");
	}, [setChatList]);

	useEffect(() => {
		socket.on("recentChatList", (chatByID) => {
			setChatList(chatByID);
		});

		return () => socket.off("recentChatList");
	}, [setChatList]);

	useEffect(() => {
		const activeChat = chatList?.filter(
			(item) => item?._id === selectedChat?._id
		);
		setSelectedChat(activeChat?.[0]);
	}, [chatList, selectedChat?._id, setSelectedChat]);

	useEffect(() => {
		socket.on("updatedGroupName", (groupDetails) => {
			let tempDetails = [...chatList];
			const indexToReplace = tempDetails.findIndex(
				(obj) => obj?._id === groupDetails?.chatID
			);
			if (indexToReplace !== -1) {
				tempDetails[indexToReplace].chatName = groupDetails?.chatName;
			}
			setChatList(tempDetails);
			setSelectedChat(tempDetails[indexToReplace]);
		});
		return () => socket.off("updatedGroupName");
	}, [chatList, setChatList, setSelectedChat]);

	useEffect(() => {
		socket.on("updatedGroupBio", (groupDetails) => {
			let tempDetails = [...chatList];
			const indexToReplace = tempDetails.findIndex(
				(obj) => obj?._id === groupDetails?.chatID
			);
			if (indexToReplace !== -1) {
				tempDetails[indexToReplace].bio = groupDetails?.bio;
			}
			setChatList(tempDetails);
			setSelectedChat(tempDetails[indexToReplace]);
		});
		return () => socket.off("updatedGroupBio");
	}, [chatList, setChatList, setSelectedChat]);

	useEffect(() => {
		socket.on("updatedGroupImage", (groupDetails) => {
			let tempDetails = [...chatList];
			const indexToReplace = tempDetails.findIndex(
				(obj) => obj?._id === groupDetails?.chatID
			);
			if (indexToReplace !== -1) {
				tempDetails[indexToReplace].groupImage = groupDetails?.groupImage;
			}
			setChatList(tempDetails);
			setSelectedChat(tempDetails[indexToReplace]);
		});
		return () => socket.off("updatedGroupImage");
	});

	return (
		<div className=' flex items-start justify-start gap-0.5 h-full w-full'>
			<Fragment>
				<div
					className={` bg-white   ${
						(selectedChat && isMobile) || (isMobile && isProfile)
							? "xs:hidden sm:hidden md:hidden xl:hidden lg:hidden 2xl:hidden"
							: "xs:w-100% sm:w-100% md:w-100% lg:w-25% xl:w-25% 2xl:w-25%"
					}`}>
					<header className='flex items-center justify-between  truncate w-95% mx-auto my-5 '>
						<div className='flex justify-start items-center gap-5 '>
							{!isSideMenu ? (
								<div
									className='cursor-pointer lg:hidden xl:hidden 2xl:hidden'
									onClick={showSidebarMenu}>
									<HiMenu
										style={{
											cursor: "pointer",
											color: `var(--background-color-dark)`,
											fontSize: `var(--fontsize-tough)`,
											fontWeight: 900,
										}}
									/>
								</div>
							) : (
								<div
									className='cursor-pointer lg:hidden xl:hidden 2xl:hidden'
									onClick={hideSidebarMenu}>
									<IoChevronBackOutline
										style={{
											cursor: "pointer",
											color: `var(--background-color-dark)`,
											fontSize: `var(--fontsize-tough)`,
											fontWeight: 900,
										}}
									/>
								</div>
							)}
							<div className='text-fontsize-pearl font-bold'>Chats</div>
						</div>
						<div
							className='group flex items-center justify-start gap-3 cursor-pointer bg-black px-3 py-3 rounded-xl'
							onClick={openSideBar}>
							<BsPlusLg
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-glossy)`,
									fontWeight: 900,
								}}
							/>
							<p className='hidden group-hover:inline  group-hover:text-white text-sm '>
								Create chat
							</p>
						</div>
					</header>
					<div className='w-95% mx-auto mt-5 mb-8'>
						<BreezeSearch
							onChangeHandler={onSearchChat}
							placeholder={"Search chat"}
							leadingIcon={
								<BiSearch
									style={{
										color: `var(--background-color-dark)`,
										fontSize: `var(--fontsize-glossy)`,
									}}
								/>
							}
							isDismissible
							register={register}
							name='searchUser'
						/>
					</div>
					<div className='w-95% mx-auto'>
						<BreezeDivider isDashed={true} />
					</div>

					<div className='w-100% mx-auto'>
						<div className='rounded-xl  items-start justify-between gap-5 m-auto'>
							<div
								className='bg-white rounded-xl overflow-y-auto '
								style={{
									height: "calc(100vh - 170px)",
									maxHeight: "calc(100vh - 170px)",
								}}>
								{isLoading ? (
									<BreezeTileSkeleton tileLength={7} />
								) : (
									<>
										{searchedMemo?.map((item, index) => {
											return (
												<div key={`tile_item_${index}`}>
													<BreezeTile
														isGPT={false}
														tileID={selectedChat?._id}
														onClickHandler={() => {
															hideBreezeGPT();
															selectedChat?._id !== item?._id &&
																onChangeChatsHandler(item);
														}}
														title={
															item?.isGroupChat
																? item?.chatName
																: CHAT_UTILS?.getOtherSideUserName(
																		loggedInUser,
																		item?.users
																  )
														}
														lastMsgSender={item?.recentMessage?.sender?.name}
														lastMsgSenderID={item?.recentMessage?.sender?._id}
														bio={!item?.recentMessage && item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
														msg={
															item?.recentMessage?.content > 30
																? item?.recentMessage?.content?.substring(
																		0,
																		30
																  ) + "..."
																: item?.recentMessage?.content
														}
														isActive={ARRAY_METHODS.isElementExist(
															onlineUsers,
															CHAT_UTILS.getOtherSideUserID(
																loggedInUser,
																item?.users
															)
														)}
														lastMessageTime={
															item &&
															item?.recentMessage?.createdAt &&
															DATE_UTILS.getTimeInAMPM(
																item?.recentMessage?.createdAt
															)
														}
														isGrouped={item?.isGroupChat}
														profileImage={
															item?.isGroupChat
																? item?.groupImage
																: CHAT_UTILS?.getOtherSideProfileImage(
																		loggedInUser,
																		item?.users
																  )
														}
														isLastTimeActive={true}
														styleClass={`transition-all duration-300 ease-in-out rounded-2xl ${
															selectedChat === item
																? " py-5 bg-gray-100"
																: "bg-transparent"
														} w-95% mx-auto`}
														// isNotification={item?.unreadMessage?.length}
														unreadMessageCount={unreadMessageCountHandler(item)}
													/>
													<hr
														style={{
															width: "95%",
															margin: "0 auto",
															borderTop: "1px solid var(--muted-color)",
														}}
													/>
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div
					className={`${
						isActive
							? "sm:hidden xs:hidden md:hidden w-51%"
							: isMobile || isActive
							? "lg:hidden xl:hidden 2xl:hidden flex-1"
							: "flex-1  w-75% "
					}`}>
					{!selectedChat && !isMobile && !isBreezeGPT ? (
						<ChatNotFound />
					) : (
						((selectedChat && isMobile) || (selectedChat && !isMobile)) && (
							<BreezeChatBox
								typing={typing}
								isTyping={isTyping}
								setIsTyping={setIsTyping}
								setTyping={setTyping}
								setChats={setChatList}
								isSelectedChatProfile={isSelectedChatProfile}
								setSelectedChatProfile={setSelectedChatProfile}
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
							/>
						)
					)}
				</div>
			</Fragment>
			{(isActive || isProfile) && (
				<div
					className={`bg-white h-screen  sm:w-100% xs:w-100% md:w-100% flex-1`}>
					<BreezeInDisplaySidebar
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
						isSelectedChatProfile={isSelectedChatProfile}
						setSelectedChatProfile={setSelectedChatProfile}
					/>
				</div>
			)}
			{isGroupChatModal && (
				<BreezeModal
					backgroundColor={"bg-white"}
					closeModal={closeGroupModal}
					isModalOpen={isGroupChatModal}
					key={"Group_chat_modal"}
					children={<BreezeGroupChat closeModal={closeGroupModal} />}
					isDismissible={true}
				/>
			)}
			{isSidebar && (
				<BreezeSideDrawer
					isOpen={isSidebar}
					onClose={closeSideBar}
					backgroundColor={"bg-white"}
					position='right-0'
					children={
						<BreezeSideDrawerBody
							onModalOpen={openGroupModal}
							onClose={closeSideBar}
							onModalClose={closeGroupModal}
						/>
					}
				/>
			)}
		</div>
	);
};

export default ChatScreen;
