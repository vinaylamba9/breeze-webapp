import { Fragment } from "react";
import { InputFieldStyleType } from "@Constants/application";
const BreezeInputField = ({
	type,
	name,
	maxLength,
	placeholder,
	onChangeHandler,
	errorMsg,
	trailingIcon,
	iconClickHandler,
	errors,
	disabled,
	required,
	register,
	isError,
	validationSchema,
	iconStyle,
	inputBoxType,
	label,
}) => {
	const formatRegister = { ...register(name, required && validationSchema) };

	return (
		<Fragment>
			<div className='w-100% '>
				<div
					tabIndex='0'
					className={
						disabled
							? "w-100% flex flex-row ease-out duration-300 cursor-pointer content-center rounded-3xl ring-2 justify-center items-center  bg-gray-100 ring-gray-100  focus-within:ring-2 focus-within:ring-gray-100 active:ring-gray-100 "
							: errors && errors[name]
							? "w-100% flex flex-row ease-out duration-300 cursor-pointer content-center rounded-3xl ring-2 justify-center items-center  ring-danger-color focus-within:ring-2 active:ring-black "
							: "w-100% flex flex-row ease-out duration-300 cursor-pointer content-center rounded-3xl ring-2 justify-center items-center  ring-black focus-within:ring-2 active:ring-black"
					}>
					{inputBoxType !== InputFieldStyleType.UNDERLINE ? (
						<input
							className={
								errors && errors[name]
									? ` mx-1 w-100% rounded-3xl 
										py-4
									px-4 outline-none	
									text-fontsize-brittle bg-transparent
						`
									: `mx-1 rounded-3xl 
								w-100% px-4 py-4  bg-transparent
								outline-none	
								text-fontsize-brittle
                            `
							}
							maxLength={maxLength}
							type={type}
							name={name}
							placeholder={placeholder}
							{...register(name, required && validationSchema)}
							onChange={(e) => {
								formatRegister.onChange(e);
								onChangeHandler?.(e);
							}}
							// onBlur={(e) => {
							// 	formatRegister.onBlur(e);
							// 	onBlurHandler?.(e);
							// }}
							// onKeyDown={(e) => {
							// 	// formatRegister.onKeyDown(e);
							// 	onKeyDownHandler?.(e);
							// }}
							id={name}
							disabled={disabled}
							required={required}
							onWheel={(e) => e.target.blur()}
							autoComplete='off'
						/>
					) : (
						<div>
							<input
								type={type}
								class='w-100% border-b-2 border-gray outline-none focus:border-color-darkTeal'
								placeholder={placeholder}
							/>
						</div>
					)}
					{trailingIcon && (
						<div
							className={`${
								iconStyle
									? iconStyle
									: disabled
									? "opacity-50 cursor-pointer relative right-5"
									: "cursor-pointer relative right-5"
							}`}
							onClick={iconClickHandler}>
							{trailingIcon}
						</div>
					)}
				</div>
				{required && !disabled
					? errors &&
					  errors[name] && (
							<div className='text-danger-color text-left  text-sm  mt-1 mx-1  '>
								{errors[name]?.message && `* ${errors[name]?.message}`}
							</div>
					  )
					: false}
				{isError && (
					<div className='text-danger-color text-left text-sm  mt-1 mx-1'>
						* {errorMsg}
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default BreezeInputField;
