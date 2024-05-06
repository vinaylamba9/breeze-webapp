import { useEffect, useRef, useState } from "react";
import { IoClose, IoArrowBackOutline } from "react-icons/io5";
import useCombinedStore from "@Zustand/store/store";

const BreezeSideDrawer = ({
	children,
	isOpen,
	onClose,
	position = "left-0",
	backgroundColor,
}) => {
	const sideDrawerRef = useRef();
	const [showContent, setShowContent] = useState(false);

	const { clearUserFromGroup, selectUserFromGroup } = useCombinedStore(
		(state) => ({
			selectUserFromGroup: state?.selectUserFromGroup,
			clearUserFromGroup: state?.clearUserFromGroup,
		})
	);
	useEffect(() => {
		const handleSideDrawerClick = (event) => {
			if (!sideDrawerRef?.current?.contains(event?.target)) onClose();
		};
		window.addEventListener("mousedown", handleSideDrawerClick);
		return () => {
			window.removeEventListener("mousedown", handleSideDrawerClick);
		};
	}, [onClose]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(isOpen);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [isOpen]);

	const drawerClasses = ` mx-auto fixed inset-y-0 ${position} z-50 w-30% xs:w-100% sm:w-100% md:w-100% ${backgroundColor} shadow-xl ${
		isOpen ? "animate-slideIn" : "animate-slideOut"
	}`;

	return (
		<main
			className={
				" transition-all duration-300 fixed z-20  inset-0  ease-in-out mx-auto" +
				(isOpen
					? "transition-opacity opacity-100 duration-500 translate-x-0"
					: "transition-all opacity-0 translate-x-full")
			}>
			<div
				ref={sideDrawerRef}
				className={drawerClasses}
				// style={{
				// 	borderTopRightRadius: position === "left-0" && "1rem",
				// 	borderBottomRightRadius: position === "left-0" && "1rem",
				// 	borderTopLeftRadius: position === "right-0" && "1rem",
				// 	borderBottomLeftRadius: position === "right-0" && "1rem",
				// }}
			>
				{selectUserFromGroup ? (
					<div
						className={`${
							position === "left-0" ? "right" : "left"
						} cursor-pointer absolute ${
							position === "left-0" ? "right-5" : "left-5"
						} top-4`}>
						<IoArrowBackOutline
							style={{
								color: `var(--background-color-dark)`,
								fontSize: `var(--fontsize-trim)`,
							}}
							onClick={clearUserFromGroup}
						/>
					</div>
				) : (
					<div
						onClick={onClose}
						className={`${
							position === "left-0" ? "right" : "left"
						} cursor-pointer absolute ${
							position === "left-0" ? "right-3" : "left-3"
						} top-2  p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300`}>
						<IoClose
							style={{
								color: `var(--background-color-dark)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
				)}
				{showContent && <div className='animate-fadeIn p-4 '>{children}</div>}
			</div>
			<section
				className='w-screen h-full cursor-pointer'
				onClick={onClose}></section>
		</main>
	);
};

export default BreezeSideDrawer;
