import { Fragment, useCallback, useEffect, useState } from "react";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { MdOutlineMail } from "react-icons/md";
import { InputType } from "@Constants/application";
import useCombinedStore from "@Zustand/store/store";
import BreezeProfileAvatar from "@Components/breezeProfileAvatar/breezeProfileAvatar.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import { HTTPStatusCode } from "@Constants/network";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";

const BreezeSelfProfile = ({ fetchAgain, setFetchAgain }) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		formState: { errors },
	} = useForm({});

	const [isEditProfileName, setEditProfileName] = useState(false);
	const [isEditProfileBio, setEditProfileBio] = useState(false);
	const { loggedInUser, setUserDetails, hideActive, hideProfile } =
		useCombinedStore((state) => ({
			loggedInUser: state?.loggedInUser,
			setUserDetails: state?.setUserDetails,
			hideActive: state?.hideActive,
			hideProfile: state?.hideProfile,
		}));
	const renameProfileNameHandler = useCallback(
		async (d) => {
			if (d?.editProfileName !== loggedInUser?.name) {
				const response = await userDAO.updateUserDetailsDAO({
					userID: loggedInUser?.userId,
					updatedData: {
						name: d?.editProfileName,
					},
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditProfileName && setEditProfileName(false);
					let userInfo = BreezeSessionManagement.getUserSession();
					setUserDetails(userInfo);
				}
			} else setEditProfileName(false);
		},
		[isEditProfileName, loggedInUser?.name, loggedInUser?.userId]
	);
	const renameProfileBioHandler = useCallback(
		async (d) => {
			if (d?.editProfileBio !== loggedInUser?.bio) {
				const response = await userDAO.updateUserDetailsDAO({
					userID: loggedInUser?.userId,
					updatedData: {
						bio: d?.editProfileBio,
					},
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditProfileBio && setEditProfileBio(false);
					let userInfo = BreezeSessionManagement.getUserSession();
					setUserDetails(userInfo);
				}
			} else {
				setEditProfileBio(false);
			}
		},
		[isEditProfileBio, loggedInUser?.bio, loggedInUser?.userId]
	);

	useEffect(() => {
		setValue("editProfileName", loggedInUser?.name);
		setValue("editProfileBio", loggedInUser?.bio);
	}, [setValue, loggedInUser?.name, loggedInUser?.bio]);

	return (
		<div
			style={{
				maxHeight: "100vh",
				minHeight: "100vh",
			}}>
			<div className=' bg-white py-3.5 rounded-bl rounded-br'>
				<div className='flex items-center gap-3 justify-start w-95% mx-auto'>
					<div
						className='p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 '
						onClick={() => {
							hideActive();
							hideProfile();
						}}>
						<IoArrowForward
							style={{
								color: `var(--background-color-black)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
					<div className=' flex-1 truncate text-fontsize-glossy font-medium'>
						Profile &nbsp;info
					</div>
				</div>
			</div>
			<div
				className='overflow-y-auto '
				style={{
					minHeight: "calc(100vh - 76px)",
					maxHeight: "calc(100vh - 76px)",
				}}>
				<div className='w-95% flex flex-col items-center justify-center my-6 mx-auto'>
					<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
						<BreezeProfileAvatar
							isIndividual={true}
							fetchAgain={fetchAgain}
							setFetchAgain={setFetchAgain}
							title={loggedInUser?.name}
							profileImage={loggedInUser?.profileImage}
						/>

						<div className='my-5 w-90%'>
							{isEditProfileName ? (
								<div className=' flex items-center justify-start gap-5'>
									<div className='w-90% '>
										<BreezeInputField
											type={InputType.EMAIL}
											name='editProfileName'
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the full name",
											}}
											placeholder='Enter full name'
											required
										/>
									</div>
									<div
										className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
										onClick={handleSubmit(renameProfileNameHandler)}>
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
										{loggedInUser?.name}
									</div>
									<div
										className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
										onClick={() => setEditProfileName(true)}>
										<FiEdit3
											style={{
												color: `var(--background-color-black)`,
												fontSize: `var(--fontsize-glossy)`,
											}}
										/>
									</div>
								</div>
							)}
							<div className='flex justify-center items-center gap-2 mt-3 cursor-pointer'>
								<MdOutlineMail
									style={{
										color: `var(--background-color-black)`,
										fontSize: `var(--fontsize-trim)`,
									}}
								/>
								<Fragment className='mt-1 text-center text-slate-400 ease-out duration-300 hover:tracking-wider'>
									{loggedInUser?.email}
								</Fragment>
							</div>
						</div>
					</div>
				</div>
				<BreezeDivider isDashed={true} />
				<div className='w-95% flex items-start justify-center my-6 bg-white rounded-2xl mx-auto'>
					{isEditProfileBio ? (
						<div className=' w-100% '>
							<div className='w-100% mx-auto  p-3'>
								<p className='text-fontsize-virgin tracking-wide px-3'>About</p>
								<BreezeInputField
									type={InputType.TEXT}
									name='editProfileBio'
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
							<p className='text-fontsize-virgin tracking-wide'>About</p>
							<p className='text-gray-700 mt-1'>{loggedInUser?.bio}</p>
						</div>
					)}
					{isEditProfileBio ? (
						<div
							className='cursor-pointer p-3 hover:rounded-full hover:bg-gray-200 ease-in-out duration-300'
							onClick={handleSubmit(renameProfileBioHandler)}>
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
							onClick={() => setEditProfileBio(true)}>
							<FiEdit3
								style={{
									color: `var(--background-color-black)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BreezeSelfProfile;
