const BreezeButton = ({
	label,
	onClickHandler,
	icon,
	backgroundColor,
	textColor,
	buttonClass,
	width,
	loaderComponent,
	isDisabled = false,
}) => {
	return (
		<div className='flex flex-row content-center justify-center items-center py-2%'>
			<button
				disabled={isDisabled}
				onClick={onClickHandler}
				style={{
					boxShadow: "0 3px 16px rgba(0,0,0,0.03), 0 3px 26px rgba(0,0,0,0.09)",
					backgroundColor: !isDisabled && backgroundColor,
					color: !isDisabled && textColor,
				}}
				className={` rounded-3xl  
				text-background-color-dark
				${isDisabled ? "bg-color-slate" : "bg-color-TealWithOpacity "}
				w-100% px-8 py-4
				ease-out duration-300
					outline-none
				border-none
				text-fontsize-brittle
				${buttonClass}	`}>
				<div className='flex  ease-in-out duration-300 justify-center items-center gap-5 '>
					{icon && (
						<div>
							{icon && <img src={icon} height='20' width='20' alt='google' />}
						</div>
					)}
					<span className='ease-out duration-300 hover:tracking-wide text-base '>
						{label}
					</span>
					{loaderComponent && loaderComponent}
				</div>
			</button>
		</div>
	);
};

export default BreezeButton;
