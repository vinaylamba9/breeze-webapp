import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdInfo } from "react-icons/md";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { HTTPStatusCode } from "@Constants/network";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { useChatState } from "@Context/chatProvider";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import _ from "lodash";
import useCombinedStore from "@Zustand/store/store";
import { ARRAY_METHODS } from "@/shared/utils/basic.utils";
const BreezeSideDrawerBody = ({ onClose, onModalClose, onModalOpen }) => {
	const { userList, setUserList } = useChatState();
	const [searchUser, setSearchUser] = useState([]);
	const {
		chatList,
		setSelectedChat,
		setChatList,
		setNewMessages,
		onlineUsers,
	} = useCombinedStore((state) => ({
		chatList: state?.chatList,
		onlineUsers: state?.onlineUsers,
		setSelectedChat: state?.setSelectedChat,
		setChatList: state?.setChatList,
		setNewMessages: state?.setNewMessages,
	}));
	const [isLoading, setLoading] = useState(false);
	const { register } = useForm({});

	/** Getting All Users list from Chat API */
	const getAllUsers = useCallback(async () => {
		setLoading(true);
		const response = await userDAO.getAllUsersDAO();
		if (response?.statusCode === HTTPStatusCode.OK) {
			setUserList(_.sortBy(response?.responseBody, ["name"]) || []);
			setLoading(false);
		}
	}, [setUserList]);

	/** Creating Chat from Sidebar  */
	const onCreateChatHandler = useCallback(
		async (id) => {
			setLoading(true);
			const response = await ChatDAO.createChatDAO({ userID: id });
			if (response?.statusCode === HTTPStatusCode.OK) {
				const data = response?.responseBody;
				if (!chatList.find((c) => c._id === data._id)) {
					setChatList([data, ...chatList]);
					setNewMessages([]);
				}
				setSelectedChat(data);

				setLoading(false);
				onClose();
			}
		},
		[chatList, onClose, setChatList, setNewMessages, setSelectedChat]
	);

	/** -------- User Search Start --------------- */
	/**
	 * @Function (onSearchUser)
	 * @param {*} e:any
	 * @returns {} It will search on the name and email field and returns the filtered Value.
	 */

	const onSearchUser = (e) => {
		let filteredData = userList.filter((item) => {
			return (
				item?.name?.toLowerCase()?.includes(e.target.value.toLowerCase()) ||
				item?.email?.toLowerCase()?.includes(e.target.value.toLowerCase())
			);
		});
		setSearchUser([...filteredData]);
	};

	const searchedMemo = useMemo(
		() => (searchUser && searchUser?.length > 0 ? searchUser : userList),
		[userList, searchUser]
	);
	/** -------- User Search End --------------- */
	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);

	const alphabetsHandler = useCallback(
		(index, item) => {
			const prev = userList?.[index - 1]?.name?.charAt(0) ?? "";
			const current = item?.name?.charAt(0);
			return (
				prev !== current && (
					<p className='ml-2 text-gray-500 text-fontsize-smart font-semibold'>
						# {current}
					</p>
				)
			);
		},
		[userList]
	);
	return (
		<div className='p-2 '>
			<div className='flex mt-10 w-95% mx-auto items-center justify-between px-4'>
				<div>
					<h2 className='  text-fontsize-pearl text-black font-bold'>
						Create chat
					</h2>

					<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
						<span>
							<MdInfo />{" "}
						</span>
						<span>Click on users to create chat.</span>
					</div>
				</div>
				<BreezeTooltip id={"createGroupChat"}>
					<button
						onClick={onModalOpen}
						title='Group Chat'
						className='
									cursor-pointer
									bg-black
									w-10 h-10
									outline-none
									rounded-xl 
									flex justify-center items-center
									text-white text-4xl relative
								'>
						<span
							data-tooltip-id='createGroupChat'
							data-tooltip-content='Create Group Chat'>
							<BsPlusLg
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
									fontWeight: 900,
								}}
							/>
						</span>
					</button>
				</BreezeTooltip>
			</div>

			<div className='w-95% mx-auto mt-5 mb-2'>
				<BreezeSearch
					onChangeHandler={onSearchUser}
					placeholder={"Search user"}
					leadingIcon={
						<BiSearch
							style={{
								color: `var(--background-color-dark)`,
								fontSize: `var(--fontsize-glossy)`,
							}}
						/>
					}
					register={register}
					name='searchUser'
				/>
			</div>
			<div className='w-100% mx-auto mt-5 '>
				{isLoading ? (
					<BreezeTileSkeleton tileLength={6} />
				) : userList && userList?.length > 0 ? (
					<div
						className=' rounded-2xl'
						style={{
							minHeight: "78vh",
							maxHeight: "78vh",
							overflowY: "scroll",
						}}>
						{searchedMemo?.map((item, index) => {
							return (
								<>
									{alphabetsHandler(index, item)}
									<div key={`add_user_${index}`}>
										<BreezeTile
											onClickHandler={() => onCreateChatHandler(item?._id)}
											title={item?.name}
											imgBackgroundColor={item?.imgBackgroundColor}
											msg={item?.msg}
											isActive={ARRAY_METHODS.isElementExist(
												onlineUsers,
												item?._id
											)}
											isGrouped={item?.isGrouped}
											profileImage={item?.profileImage}
											isNotification={item?.isNotification}
											bio={item?.bio}
											email={item?.email}
											styleClass={
												"bg-white w-95% mx-auto  py-4 rounded-2xl transform  hover:bg-gray-100 transition duration-300 ease-in-out"
											}
										/>
									</div>
								</>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default BreezeSideDrawerBody;
