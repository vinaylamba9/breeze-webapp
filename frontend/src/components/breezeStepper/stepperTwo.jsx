import { BiSearch } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdInfo } from "react-icons/md";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezePills from "@Components/breezePills/breezePills.components";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import { useCreateGroupState } from "@Context/createGroupProvider";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { HTTPStatusCode } from "@Constants/network";
import { useChatState } from "@Context/chatProvider";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import useCombinedStore from "@Zustand/store/store";

const StepperTwo = ({
	fetchAgain,
	setFetchAgain,
	existingUser,
	isEditGroup,
	handlePrev,
	closeModal,
}) => {
	const [selectedUser, setSelectedUser] = useState([]);
	const { formDetails, setFormDetails } = useCreateGroupState();
	const [newUsersToAdd, setNewUsersToAdd] = useState([]); //Will work only in case of update
	const [isLoading, setLoading] = useState(false);
	const { user, userList, setUserList } = useChatState();

	const { chatList, selectedChat, setSelectedChat, setChatList } =
		useCombinedStore((state) => ({
			chatList: state?.chatList,
			selectedChat: state?.selectedChat,
			setSelectedChat: state?.setSelectedChat,
			setChatList: state?.setChatList,
		}));
	const { register } = useForm({});
	/** Getting All Users list from Chat API */
	const getAllUsers = useCallback(async () => {
		setLoading(true);
		const response = await userDAO.getAllUsersDAO();
		if (response?.statusCode === HTTPStatusCode.OK) {
			setUserList(response?.responseBody || []);
			setLoading(false);
		}
	}, [setUserList]);

	const onSelectUsersHandler = useCallback(
		(user) => {
			if (selectedUser?.findIndex((item) => item?._id === user?._id) !== -1) {
				return toast.error("Users already selected.", {
					transition: Slide,
					style: {
						borderRadius: ".5rem",
						color: "var(--background-color-dark)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--background-color-dark)" },
				});
			}
			const userToSelect = [...selectedUser, user];
			setSelectedUser(userToSelect);
			setFormDetails({
				...formDetails,
				users: userToSelect,
			});
		},
		[formDetails, selectedUser, setFormDetails]
	);
	const onSelectUsersOnUpdateHandler = useCallback(
		(alreadyExistingUser) => {
			if (
				selectedUser?.findIndex(
					(item) => item?._id === alreadyExistingUser?._id
				) !== -1
			) {
				return toast.error("Users already selected.", {
					transition: Slide,
					style: {
						borderRadius: ".5rem",
						color: "var(--background-color-dark)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--background-color-dark)" },
				});
			}
			if (selectedChat?.groupAdmin?._id !== user?.userId) {
				return toast.error("Only admin can add users.", {
					transition: Slide,
					style: {
						borderRadius: ".5rem",
						color: "var(--background-color-dark)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--background-color-dark)" },
				});
			}
			const userToSelect = [...selectedUser, alreadyExistingUser];
			const newUser = [...newUsersToAdd, alreadyExistingUser];
			setSelectedUser(userToSelect);
			setNewUsersToAdd(newUser);
		},
		[newUsersToAdd, selectedChat?.groupAdmin?._id, selectedUser, user?.userId]
	);

	const onRemoveSelectedUser = (user) => {
		const removedUser = selectedUser?.filter((item) => item?._id !== user?._id);
		setSelectedUser(removedUser);
		isEditGroup && setNewUsersToAdd(removedUser);
		setFormDetails({
			...formDetails,
			users: removedUser,
		});
	};

	const onCreateGroupHandler = async () => {
		delete formDetails?.profileImage;
		const response = await ChatDAO.createGroupChatDAO(formDetails);
		if (response?.statusCode === HTTPStatusCode.OK) {
			setChatList([response?.responseBody, ...chatList]);
			setFormDetails({
				name: null,
				bio: null,
				groupImage: null,
				users: [],
				profileImage: null,
			});
			closeModal();
		}
	};

	const onUpdateGroupHandler = async () => {
		const response = await ChatDAO.addMultipleUsersToGroupDAO({
			chatID: selectedChat?._id,
			users: newUsersToAdd,
		});
		setSelectedChat(response?.responseBody);
		setFetchAgain(!fetchAgain);
	};

	const onRemoveUserHandler = useCallback(
		async (item) => {
			const response = await ChatDAO.removeUserFromGroupDAO({
				chatID: selectedChat?._id,
				userID: item?._id,
			});
			if (response?.statusCode === HTTPStatusCode.OK)
				setSelectedUser(
					selectedUser?.filter((chat) => chat?._id !== item?._id)
				);
		},
		[selectedChat?._id, selectedUser]
	);
	useEffect(() => {
		setSelectedUser(formDetails?.users);
	}, [formDetails]);

	useEffect(() => {
		isEditGroup && getAllUsers();
	}, [getAllUsers, isEditGroup]);

	useEffect(() => {
		isEditGroup && setSelectedUser(existingUser);
	}, [existingUser, isEditGroup]);

	return (
		<>
			<ToastContainer />

			<div className={`mt-5 ${isEditGroup && "w-95% mx-auto"}`}>
				{isEditGroup && (
					<div className='mb-5'>
						<h2 className='text-fontsize-pearl text-black font-bold'>
							Add members
						</h2>

						<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
							<span>
								<MdInfo />
							</span>
							<span>Click on users to create chat.</span>
						</div>
					</div>
				)}
				<div
					className={`mt-10 ${
						isEditGroup ? "w-100%" : "w-70% xs:w-100% sm:w-100%"
					} mx-auto`}>
					<BreezeSearch
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
				<div
					className={`mt-5 ${
						isEditGroup ? "w-100%" : "w-70% xs:w-100% sm:w-100%"
					} mx-auto flex flex-nowrap items-center justify-start overflow-x-scroll gap-1 `}>
					{selectedUser?.map((item) => (
						<div key={item} className='flex-shrink-0'>
							<BreezePills
								title={item?.name}
								onRemove={
									isEditGroup
										? async () => {
												onRemoveSelectedUser(item);
												await onRemoveUserHandler(item);
										  }
										: () => onRemoveSelectedUser(item)
								}
							/>
						</div>
					))}
				</div>
				<div
					className='w-100% mt-5'
					style={{
						minHeight: "50vh",
					}}>
					<div
						className='my-2 rounded-2xl  flex flex-row  flex-wrap gap-1 items-center justify-start'
						style={{
							maxHeight: "45vh",
							minHeight: "45vh",
							overflowY: "scroll",
						}}>
						{isLoading ? (
							<BreezeTileSkeleton tileLength={6} />
						) : (
							userList?.map((item, index) => {
								return (
									<div
										className='w-48% xs:w-100% sm:w-100%'
										key={"group_chat_users_" + index}>
										<BreezeTile
											onClickHandler={
												isEditGroup
													? () => onSelectUsersOnUpdateHandler(item)
													: () => onSelectUsersHandler(item, index)
											}
											title={item?.name}
											imgBackgroundColor={item?.imgBackgroundColor}
											msg={item?.msg}
											isActive={item?.isActive}
											isGrouped={item?.isGrouped}
											profileImage={item?.profileImage}
											isNotification={item?.isNotification}
											bio={item?.bio}
											styleClass={
												"bg-white  mx-2 py-4 rounded-2xl transform  hover:bg-gray-100 transition duration-300 ease-in-out"
											}
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
							})
						)}
					</div>
				</div>
				<div className='flex items-center justify-center gap-4  '>
					{isEditGroup ? (
						<BreezeButton
							label={"Update group "}
							backgroundColor={`var(--background-color-dark)`}
							textColor={`var(--text-color-purity)`}
							onClickHandler={onUpdateGroupHandler}
						/>
					) : (
						handlePrev && (
							<BreezeButton
								label={"Previous step"}
								backgroundColor={`var(--background-color-dark)`}
								textColor={`var(--text-color-purity)`}
								onClickHandler={handlePrev}
							/>
						)
					)}
					{handlePrev && selectedUser?.length > 0 && (
						<BreezeButton
							label={"Create group "}
							backgroundColor={`var(--background-color-dark)`}
							textColor={`var(--text-color-purity)`}
							onClickHandler={onCreateGroupHandler}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default StepperTwo;
