import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosExit } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { InputType } from "@Constants/application";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { HTTPStatusCode } from "@Constants/network";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import StepperTwo from "@Components/breezeStepper/stepperTwo";
import CreateGroupProvider from "@Context/createGroupProvider";
import BreezeProfileAvatar from "@Components/breezeProfileAvatar/breezeProfileAvatar.components";
import useCombinedStore from "@Zustand/store/store";
import { IoArrowForward } from "react-icons/io5";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";
import { socket } from "@Socket/socket";

const BreezeGroupProfile = ({
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
	onClose,
}) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		formState: { errors },
	} = useForm({});

	const [isEditGroupName, setEditGroupName] = useState(false);
	const [isEditGroupBio, setEditGroupBio] = useState(false);
	const [addMembersModal, setAddMembersModal] = useState(false);

	const {
		selectUserFromGroup,
		clearUserFromGroup,
		hideActive,
		loggedInUser,
		selectedChat,
		setSelectedChat,
		setSelectUserFromGroup,
	} = useCombinedStore((state) => ({
		selectUserFromGroup: state?.selectUserFromGroup,
		setSelectUserFromGroup: state?.setSelectUserFromGroup,
		hideActive: state?.hideActive,
		loggedInUser: state?.loggedInUser,
		clearUserFromGroup: state?.clearUserFromGroup,
		selectedChat: state?.selectedChat,
		setSelectedChat: state?.setSelectedChat,
	}));

	const onFilterUserFromGroup = (item) => {
		const response = selectedChat?.users?.filter(
			(user) => user._id === item?._id
		);
		setSelectUserFromGroup(response?.[0]);
	};

	const renameGroupNameHandler = useCallback(
		async (d) => {
			if (d?.editGroupName !== selectedChat?.chatName) {
				const response = await ChatDAO.renameGroupChatDAO({
					chatID: selectedChat?._id,
					chatName: d?.editGroupName,
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditGroupName && setEditGroupName(false);
					setSelectedChat(response?.responseBody);
					socket.emit("updateGroupName", {
						updatedGroupName: response?.responseBody,
					});
				}
			} else {
				setEditGroupName(false);
			}
		},
		[
			selectedChat?.chatName,
			selectedChat?._id,
			isEditGroupName,
			setSelectedChat,
		]
	);
	const renameGroupBioHandler = useCallback(
		async (d) => {
			if (d?.editGroupBio !== selectedChat?.bio) {
				const response = await ChatDAO.renameGroupChatBioDAO({
					chatID: selectedChat?._id,
					bio: d?.editGroupBio,
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditGroupBio && setEditGroupBio(false);
					setSelectedChat(response?.responseData);
					socket.emit("updateGroupBio", {
						updatedGroupBio: response?.responseBody,
					});
				}
			} else setEditGroupBio(false);
		},
		[selectedChat?.bio, selectedChat?._id, isEditGroupBio, setSelectedChat]
	);
	const leaveGroupHandler = useCallback(async () => {
		const response = await ChatDAO.removeUserFromGroupDAO({
			chatID: selectedChat?._id,
			userID: loggedInUser?.userId,
		});
		if (response?.statusCode === HTTPStatusCode.OK) setSelectedChat();
		setFetchAgain(!fetchAgain);
	}, [
		fetchAgain,
		selectedChat?._id,
		setFetchAgain,
		setSelectedChat,
		loggedInUser?.userId,
	]);

	useEffect(() => {
		setValue("editGroupName", selectedChat?.chatName);
		setValue("editGroupBio", selectedChat?.bio);
	}, [setValue, selectedChat?.chatName, selectedChat?.bio]);
	return (
		<div
			style={{
				maxHeight: "100vh",
				minHeight: "100vh",
			}}>
			{selectUserFromGroup ? (
				<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
			) : (
				<>
					<div className=' bg-white py-3.5 rounded-bl rounded-br'>
						<div className='flex items-center gap-3 justify-start w-95% mx-auto'>
							<div
								className='p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 '
								onClick={() => {
									hideActive();
									clearUserFromGroup();
								}}>
								<IoArrowForward
									style={{
										color: `var(--background-color-black)`,
										fontSize: `var(--fontsize-trim)`,
									}}
								/>
							</div>
							<div className=' flex-1 truncate text-fontsize-glossy font-medium'>
								Contact &nbsp;info
							</div>
						</div>
					</div>
					<div
						className='overflow-y-auto '
						style={{
							minHeight: "calc(100vh - 76px)",
							maxHeight: "calc(100vh - 76px)",
						}}>
						<div className='w-95% flex flex-col items-center justify-center mt-5 mx-auto'>
							<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
								<BreezeProfileAvatar
									setSelectedChatProfile={setSelectedChatProfile}
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
									title={
										selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													loggedInUser,
													selectedChat?.users
											  )
									}
									profileImage={
										selectedChat?.isGroupChat
											? selectedChat?.groupImage
											: CHAT_UTILS?.getOtherSideProfileImage(
													loggedInUser,
													selectedChat?.users
											  )
									}
								/>

								<div className='my-5 w-90%'>
									{isEditGroupName ? (
										<div className=' flex items-center justify-start gap-5'>
											<div className='w-90% '>
												<BreezeInputField
													type={InputType.EMAIL}
													name='editGroupName'
													register={register}
													errors={errors}
													validationSchema={{
														required: "Please enter the name",
													}}
													placeholder='Enter group name'
													required
												/>
											</div>
											<div
												className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
												onClick={handleSubmit(renameGroupNameHandler)}>
												<FiCheck
													style={{
														color: `var(--background-color-black)`,
														fontSize: `var(--fontsize-glossy)`,
													}}
												/>
											</div>
										</div>
									) : (
										<div className='flex items-center justify-center gap-5'>
											<div className='text-center uppercase  text-fontsize-pearl ease-out duration-300 hover:tracking-wider cursor-pointer '>
												{selectedChat?.isGroupChat
													? selectedChat?.chatName
													: CHAT_UTILS?.getOtherSideUserName(
															loggedInUser,
															selectedChat?.users
													  )}
											</div>
											<div
												className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
												onClick={() => setEditGroupName(true)}>
												<FiEdit3
													style={{
														color: `var(--background-color-black)`,
														fontSize: `var(--fontsize-glossy)`,
													}}
												/>
											</div>
										</div>
									)}

									<p className='mt-1 text-center text-slate-400 ease-out duration-300 hover:tracking-wider  cursor-pointer'>
										<b>Group</b> :{" "}
										{selectedChat?.isGroupChat && selectedChat?.users?.length}
										&nbsp; Members
									</p>
								</div>
							</div>
						</div>
						<BreezeDivider isDashed={true} />
						<div className='w-95% flex items-start justify-center my-6 bg-white rounded-2xl mx-auto'>
							{isEditGroupBio ? (
								<div className=' w-100% '>
									<div className='w-100% mx-auto  p-3'>
										<p className='mb-1 text-fontsize-virgin text-gray-900 tracking-wide font-medium'>
											About
										</p>
										<BreezeInputField
											type={InputType.TEXT}
											name='editGroupBio'
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the bio",
											}}
											placeholder='Enter bio'
											required
										/>
									</div>
								</div>
							) : (
								<div className='flex flex-col items-start justify-start  w-80% py-3 mx-auto cursor-pointer'>
									<p className='text-fontsize-virgin text-gray-900 tracking-wide font-medium'>
										About
									</p>
									<p className='text-gray-700 mt-1'>
										{selectedChat?.isGroupChat
											? selectedChat?.bio
											: CHAT_UTILS?.getOtherSideProfileBio(
													loggedInUser,
													selectedChat?.users
											  )}
									</p>
								</div>
							)}
							{isEditGroupBio ? (
								<div
									className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
									onClick={handleSubmit(renameGroupBioHandler)}>
									<FiCheck
										style={{
											color: `var(--background-color-black)`,
											fontSize: `var(--fontsize-glossy)`,
										}}
									/>
								</div>
							) : (
								<div
									className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
									onClick={() => setEditGroupBio(true)}>
									<FiEdit3
										style={{
											color: `var(--background-color-black)`,
											fontSize: `var(--fontsize-glossy)`,
										}}
									/>
								</div>
							)}
						</div>
						<BreezeDivider isDashed={true} />
						<div className='w-95% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl mx-auto'>
							<div className=' w-95% py-3 mx-auto cursor-pointer '>
								{selectedChat?.groupAdmin?._id === loggedInUser?.userId && (
									<div
										className=' truncate   duration-300 ease-in-out  py-1 flex items-center justify-start gap-3	'
										onClick={() => setAddMembersModal(true)}>
										<span className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'>
											<BsPlusLg
												style={{
													cursor: "pointer",
													color: `var(--background-color-black)`,
													fontSize: `var(--fontsize-trim)`,
													fontWeight: 900,
												}}
											/>
										</span>
										<span className='text-gray-900 text-lg font-medium'>
											Add &nbsp; Members
										</span>
									</div>
								)}
							</div>
							<div className='w-100%'>
								<div
									className='bg-white px-2 rounded-2xl'
									style={{
										maxHeight: "50vh",
									}}>
									<div
										className='my-2 rounded-2xl'
										style={{
											maxHeight: "50vh",
											overflowY: "scroll",
										}}>
										{selectedChat?.users?.map((item, index) => {
											return (
												<div key={`tile_item_${index}`}>
													<BreezeTile
														onClickHandler={
															loggedInUser?.userId !== item?._id
																? () => onFilterUserFromGroup(item)
																: null
														}
														title={item?.name}
														bio={item?.bio}
														msg={item?.bio} // TODO:- FIXES BASED ON MSG || BIO
														isGrouped={item?.isGroupChat}
														profileImage={item?.profileImage}
														isNotification={false}
														isAdmin={
															selectedChat?.groupAdmin?._id === item?._id
														}
														styleClass={`transition-all duration-300 ease-in-out rounded-2xl`}
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
									</div>
								</div>
							</div>
						</div>
						<BreezeDivider isDashed={true} />
						<div className='w-95% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl mx-auto'>
							<div className=' w-100% flex flex-col justify-center items-center  py-3'>
								<div
									className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'
									onClick={leaveGroupHandler}>
									<IoIosExit
										style={{
											color: `var(--danger-color)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
									<p className='text-danger-color text-fontsize-brittle'>
										Exit Group
									</p>
								</div>
							</div>
							<hr />
							<div className=' w-100% flex flex-col justify-center items-center  py-3'>
								<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
									<MdReportProblem
										style={{
											color: `var(--danger-color)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
									<p className='text-danger-color text-fontsize-brittle'>
										Report Group
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{addMembersModal && (
				<BreezeModal
					width={"w-40%"}
					isModalOpen={addMembersModal}
					closeModal={() => setAddMembersModal(false)}
					backgroundColor={"bg-white"}
					key={"add_members_to_group"}
					isDismissible={true}
					children={
						<CreateGroupProvider>
							<StepperTwo
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
								existingUser={selectedChat?.users?.filter(
									(item) => loggedInUser?.userId !== item?._id
								)}
								isEditGroup={true}
								closeModal={() => setAddMembersModal(false)}
							/>
						</CreateGroupProvider>
					}
				/>
			)}
		</div>
	);
};

export default BreezeGroupProfile;
