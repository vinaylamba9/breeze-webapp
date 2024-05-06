import { useCallback, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
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
import { useLocation, useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";

const OTPScreen = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [isLoading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({});

	const verifyAccountHandler = useCallback(
		async (d) => {
			setLoading(true);
			const response = await userDAO.verifyOTPDAO({
				email: state?.email,
				otp: d?.otp,
			});

			if (response?.statusCode === HTTPStatusCode.BAD_REQUEST) {
				setLoading(false);
				return toast.info(response?.responseBody, {
					transition: Slide,
					style: {
						borderRadius: ".5rem",
						color: "var(--background-color-dark)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--background-color-dark)" },
				});
			} else if (response?.statusCode === HTTPStatusCode.OK) {
				setLoading(false);
				navigate(BreezeRoutes.LOGINROUTE);
			}
		},
		[state?.email, navigate]
	);

	const resendOTPHandler = useCallback(async () => {
		setLoading(true);
		const response = await userDAO.resendOTPDAO({ email: state?.email });
		if (response?.statusCode === HTTPStatusCode.OK) {
			setLoading(false);
			return toast.info("OTP sent to your email.", {
				transition: Slide,
				style: {
					borderRadius: ".5rem",
					color: "var(--background-color-dark)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--background-color-dark)" },
			});
		}
	}, [state?.email]);
	useEffect(() => {
		!state?.email
			? navigate(BreezeRoutes.SIGNUPROUTE)
			: setValue("email", state?.email);
	}, [navigate, setValue, state]);
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
					className='  flex justify-center flex-col mt-5 '
					style={{ minHeight: "calc(90vh - 170px)" }}>
					<div className='mt-10% w-75% items-center  text-fontsize-brittle mx-auto  '>
						<div>
							<h1 className=' text-fontsize-tough tracking font-semibold text-background-color-jade'>
								Verify your account
							</h1>
							<p className='text-gray-500 mt-1'>
								Enter the OTP sent to your email.
							</p>
						</div>
						<div className='mt-16  '>
							<div className='mt-5 mb-10'>
								<BreezeInputField
									disabled={true}
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
									placeholder='Email'
									required
								/>
							</div>
							<div className='mt-5 mb-5'>
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
								label='Verify your account'
								onClickHandler={handleSubmit(verifyAccountHandler)}
							/>

							<center className='my-10'>
								<span className='text-gray-500 flex items-center justify-center gap-2'>
									OTP expired ?{" "}
									<p
										onClick={resendOTPHandler}
										className='text-black cursor-pointer hover:underline ease-in-out duration-300'>
										<b>Resend OTP</b>
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

export default OTPScreen;
