import { useCallback, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeButton from "@Components/breezeButton/breezeButton.components.jsx";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import useIconToggle from "@Shared/hooks/useIconToggle.js";
import {
	PasswordIconAiFillEye,
	PasswordIconAiFillEyeInvisible,
} from "@Shared/utils/toggleIcon.utils.js";
import { userDAO } from "@/modules/onboarding/core/userDAO.js";
import { HTTPStatusCode } from "@Constants/network";
import { EmailRegEx, InputType } from "@Constants/application";
import { Link, useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import BreezeLoader from "@Components/breezeLoader/breezeLoader.components";
const Login = () => {
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	const onForgotPasswordClickHandler = () => {
		navigate(BreezeRoutes.FORGOTPASSWORDROUTE);
	};

	const loginHandler = useCallback(async (d) => {
		setLoading(true);
		const response = await userDAO.loginDAO({
			email: d?.email,
			password: d?.password,
		});

		if (response?.statusCode === HTTPStatusCode.OK) {
			setLoading(false);
			window.location.reload(BreezeButton.CHATROUTE);
			// navigate(BreezeRoutes.CHATROUTE, {});
		} else if (response?.statusCode === HTTPStatusCode.BAD_REQUEST) {
			setLoading(false);
			return toast.error(response?.responseBody?.errors?.[0]?.msg, {
				transition: Slide,
				style: {
					borderRadius: ".5rem",
					color: "var(--background-color-dark)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--danger-color)" },
			});
		} else if (
			response?.statusCode === HTTPStatusCode.UNAUTHORIZED ||
			response?.statusCode === HTTPStatusCode.NOT_FOUND
		) {
			setLoading(false);
			return toast.error(response?.responseBody, {
				transition: Slide,
				style: {
					borderRadius: ".5rem",
					color: "var(--background-color-dark)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--danger-color)" },
			});
		}
	}, []);

	useEffect(() => {
		let login = BreezeSessionManagement.getAPIKey();
		if (login) navigate(BreezeRoutes.CHATROUTE);
	}, [navigate]);

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
					className='flex justify-center flex-col mt-5 '
					style={{ minHeight: "calc(90vh - 170px)" }}>
					<div className='mt-10% w-75% items-center  text-fontsize-brittle mx-auto  '>
						<div className=' text-fontsize-tough tracking font-semibold text-background-color-jade'>
							Welcome back !
						</div>
						<div className='mt-16  '>
							<div className='mt-5 mb-10'>
								<BreezeInputField
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
							<div className=' -mt-2 mb-5 flex justify-end items-end text-black '>
								<div
									className='hover:tracking-wide float-right cursor-pointer text-sm ease-in-out duration-300'
									onClick={onForgotPasswordClickHandler}>
									Forgot Password ?
								</div>
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
								label='Log in'
								onClickHandler={handleSubmit(loginHandler)}
							/>
							<center>
								<p>Or</p>
							</center>
							<BreezeButton
								icon={
									"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687718507/google_w2quk4.png"
								}
								backgroundColor={`var(--text-color-purity)`}
								textColor={`var(--text-color-dark)`}
								label='Log in with Google'
								onClickHandler={() =>
									toast.info("Features is coming soon!.", {
										transition: Slide,
										icon: "🚀",
										style: {
											borderRadius: "1rem",
											color: "var(--background-color-dark)",
											boxShadow:
												"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
										},
										progressStyle: {
											background: "var(--background-color-dark)",
										},
									})
								}
							/>
							<center className='my-10'>
								<span className='text-gray-500 flex items-center justify-center gap-2'>
									Don't have an account ?{" "}
									<Link to={BreezeRoutes.SIGNUPROUTE}>
										<p className='text-black cursor-pointer hover:underline ease-in-out duration-300'>
											<b>Sign up</b>
										</p>
									</Link>
								</span>
							</center>
						</div>
					</div>
				</div>
			</center>
		</div>
	);
};

export default Login;
