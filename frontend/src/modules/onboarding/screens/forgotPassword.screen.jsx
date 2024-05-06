import { useCallback, useState } from "react";
import { MdEmail, MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoKeypad } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeButton from "@Components/breezeButton/breezeButton.components.jsx";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import BreezeLoader from "@Components/breezeLoader/breezeLoader.components";
import { userDAO } from "@/modules/onboarding/core/userDAO.js";
import { HTTPStatusCode } from "@Constants/network";
import { EmailRegEx, InputType } from "@Constants/application";
import { useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";
import useIconToggle from "@Shared/hooks/useIconToggle.js";
import {
	PasswordIconAiFillEye,
	PasswordIconAiFillEyeInvisible,
} from "@Shared/utils/toggleIcon.utils.js";

const ForgotPassword = () => {
	const navigate = useNavigate();

	const [isLoading, setLoading] = useState(false);
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
	const [isUpdateFields, setUpdateFields] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({});

	const getOTPHandler = useCallback(async (d) => {
		setLoading(true);
		const response = await userDAO.forgotPasswordDAO({
			email: d?.email,
		});
		if (response?.statusCode === HTTPStatusCode.OK) {
			setLoading(false);
			setUpdateFields(true);
			return toast.info(response?.responseBody, {
				transition: Slide,
				style: {
					borderRadius: ".5rem",
					color: "var(--background-color-dark)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--background-color-dark)" },
			});
		}
		if (
			response?.statusCode === HTTPStatusCode.BAD_REQUEST ||
			response?.statusCode === HTTPStatusCode.NOT_FOUND
		) {
			setLoading(false);
			return toast.info("EMAIL NOT FOUND.", {
				transition: Slide,
				style: {
					borderRadius: ".5rem",
					color: "var(--background-color-dark)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--background-color-dark)" },
			});
		}
	}, []);

	const updatePasswordHandler = useCallback(
		async (d) => {
			setLoading(true);
			const response = await userDAO.updatePasswordDAO({
				email: d?.email,
				otp: d?.otp,
				password: d?.password,
			});

			if (response?.statusCode === HTTPStatusCode.OK) {
				setLoading(false);
				navigate(BreezeRoutes.LANDINGROUTE);
			} else if (response?.statusCode === HTTPStatusCode.BAD_REQUEST) {
				setLoading(false);
				return toast.info("OTP is not matched.", {
					transition: Slide,
					style: {
						borderRadius: ".5rem",
						color: "var(--background-color-dark)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--background-color-dark)" },
				});
			}
		},
		[navigate]
	);

	return (
		<div className='flex flex-col animate-fadeIn'>
			<ToastContainer />

			<div className='mt-2 ml-5 cursor-pointer flex justify-start items-center gap-3'>
				<img
					alt='breeze_logo'
					width={40}
					src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1695488831/Group_4_d9lhto.png'
				/>
				<h1 className='text-fontsize-tough font-semibold'>Breeze</h1>
			</div>
			<center>
				<div
					className='  flex justify-center flex-col  '
					style={{ minHeight: "calc(90vh - 200px)" }}>
					<div className='mt-10% w-75% items-center  text-fontsize-brittle mx-auto  '>
						<div>
							<h1 className=' text-fontsize-tough tracking font-semibold text-background-color-jade'>
								{isUpdateFields ? "Reset" : "Forgot"} &nbsp;Password?
							</h1>
							<p className='text-gray-500 mt-1'>
								No worries, we'll send you reset instructions.
							</p>
						</div>
						<div className='mt-16  '>
							<div className='mt-5 mb-5'>
								<BreezeInputField
									disabled={isUpdateFields}
									type={InputType.EMAIL}
									name='email'
									register={register}
									trailingIcon={
										<MdEmail
											style={{
												color: `text-black`,
												fontSize: `var(--fontsize-glossy)`,
											}}
										/>
									}
									errors={errors}
									validationSchema={{
										required: "Please enter the valid email.",
										pattern: {
											value: EmailRegEx.email,
											message: "Please enter the valid email.",
										},
									}}
									placeholder='Enter your email'
									required
								/>
							</div>
							{isUpdateFields && (
								<>
									<div className='mt-8 mb-5'>
										<BreezeInputField
											maxLength={6}
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the valid OTP .",
											}}
											name='otp'
											type={InputType.TEXT}
											trailingIcon={
												<IoKeypad
													style={{
														color: `text-black`,
														fontSize: `var(--fontsize-glossy)`,
													}}
												/>
											}
											placeholder='OTP'
											required
										/>
									</div>
									<div className='mt-8 mb-5'>
										<BreezeInputField
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the valid password .",
											}}
											name='password'
											type={
												togglePasswordVisibility
													? InputType.PASSWORD
													: InputType.TEXT
											}
											trailingIcon={
												togglePasswordVisibility ? (
													<PasswordIconAiFillEyeInvisible />
												) : (
													<PasswordIconAiFillEye />
												)
											}
											iconClickHandler={onTogglePassword}
											placeholder='Password'
											required
										/>
									</div>
								</>
							)}

							<BreezeButton
								loaderComponent={
									<BreezeLoader
										height='h-6'
										width='w-6'
										loaderColor={"white"}
										isLoading={isLoading}></BreezeLoader>
								}
								backgroundColor={`var(--background-color-dark)`}
								textColor={`var(--text-color-purity)`}
								label={isUpdateFields ? "Reset Password" : "Get OTP"}
								onClickHandler={
									isUpdateFields
										? handleSubmit(updatePasswordHandler)
										: handleSubmit(getOTPHandler)
								}
							/>
							<center className='my-10'>
								<span className=' text-gray-500 flex items-center justify-center gap-1 '>
									<MdOutlineKeyboardBackspace className='mt-0.5 cursor-pointer text-black text-fontsize-strong  border p-2 rounded-full hover:bg-gray-900 hover:text-white ease-in-out duration-300' />
									&nbsp; &nbsp;<p>Back to</p>
									<p
										onClick={() => navigate(BreezeRoutes.LOGINROUTE)}
										className='text-black cursor-pointer hover:underline ease-in-out duration-300'>
										<b>Log in</b>
									</p>
								</span>
							</center>
						</div>
					</div>
				</div>
			</center>
		</div>
	);
};

export default ForgotPassword;
