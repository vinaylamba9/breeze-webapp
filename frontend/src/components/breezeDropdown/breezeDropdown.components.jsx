import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { InputType } from "@Constants/application";
const BreezeDropdown = ({
	children,
	listItems,
	isUploadFile = false,
	isIcon,
	menuAction,
	direction,
	width,
	isAnimation,
	setIsAnimation,
}) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const itemRef = useRef();

	useEffect(() => {
		const handleDropdownClick = (event) => {
			if (
				!menuRef?.current?.contains(event?.target) &&
				!itemRef?.current?.contains(event?.target)
			) {
				setOpen(false);
				setIsAnimation(false);
			}
		};
		window.addEventListener("click", handleDropdownClick);
		return () => {
			window.removeEventListener("click", handleDropdownClick);
		};
	}, [setIsAnimation]);

	const directionMemo = useMemo(() => {
		switch (direction) {
			case "bottom":
				return " bottom-16 -left-2";
			default:
				break;
		}
	}, [direction]);

	return (
		<Fragment>
			<div className='flex flex-col items-center relative ' ref={itemRef}>
				<motion.div onClick={() => setOpen(!open)}>{children}</motion.div>
				{open && (
					<div
						transition={{
							delay: 3,
							duration: 2,
							ease: "easeIn",
							type: "spring",
						}}
						animate={{ opacity: isAnimation ? 1 : 0 }}
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						ref={menuRef}
						className={`${
							open
								? `z-10  rounded-xl ${directionMemo} ${
										width || "w-96"
								  } bg-white backdrop-blur-lg py-4 px-2 shadow-md  absolute mt-14 animate-fadeIn`
								: " animate-fadeOut"
						} `}>
						{isUploadFile ? (
							<div>
								{listItems?.map((item) => {
									return (
										<div
											data-index={item?.key}
											onClick={(e) => menuAction(e, item?.key)}
											key={item?.key}
											className={
												item?.isDisabled
													? "flex justify-start  items-center py-2 cursor-not-allowed opacity-30"
													: " group hover:bg-gray-100  hover:rounded-lg flex justify-start items-center ease-out duration-300 py-2 cursor-pointer gap-3 px-2"
											}>
											{isIcon ? (
												<div key={item?.key}>{item?.fileComponent}</div>
											) : (
												<div key={item?.key}>
													<input
														placeholder={item?.fileUploadName}
														type={InputType.FILE}
														className='hidden'
														id={item?.fileUplaodID}
														name={item?.fileUploadName}
														accept={item?.fileAcceptType}
														onChange={item?.fileUplaodHandler}
													/>
													<label
														className='flex gap-2 cursor-pointer '
														htmlFor={item?.fileUplaodID}>
														<span className='group-hover:text-color-darkTeal group-hover:font-medium transition-all ease-out duration-300 '>
															{item?.label}
														</span>
													</label>
												</div>
											)}
										</div>
									);
								})}
							</div>
						) : (
							<div>
								{listItems?.map((item) => {
									return (
										<div
											data-index={item?.key}
											onClick={(e) => menuAction(e, item?.key)}
											key={item?.key}
											className={
												item?.isDisabled
													? "flex  justify-start items-center py-2 cursor-not-allowed opacity-30"
													: " group hover:bg-gray-100 hover:rounded-lg flex justify-start items-center ease-out duration-300 py-2 cursor-pointer gap-3 px-2"
											}>
											{isIcon && <div key={item?.key}>{item?.icon}</div>}
											<div
												key={item?.key}
												className='group-hover:text-color-darkTeal group-hover:font-medium transition-all ease-out duration-300 '>
												{item?.label}
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default BreezeDropdown;
