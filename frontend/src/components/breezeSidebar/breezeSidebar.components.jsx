import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import {
	MdCall,
	MdSettings,
	MdNewspaper,
	MdOutlinePowerSettingsNew,
} from "react-icons/md";
import { HiUserGroup, HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useCallback } from "react";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import BreezeRoutes from "@Constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { socket } from "@Socket/socket";
import useCombinedStore from "@Zustand/store/store";
import { ARRAY_METHODS } from "@Shared/utils/basic.utils";
import { GiArtificialHive } from "react-icons/gi";
const BreezeSidebar = () => {
	const {
		clearLoggedInUser,
		loggedInUser,
		showActive,
		showProfile,
		onlineUsers,
	} = useCombinedStore((state) => ({
		loggedInUser: state?.loggedInUser,
		showActive: state?.showActive,
		showProfile: state?.showProfile,
		clearLoggedInUser: state?.clearLoggedInUser,
		onlineUsers: state?.onlineUsers,
	}));
	const navigate = useNavigate();
	const switchLocation = useLocation();
	let urlSplitter = `/${switchLocation.pathname.split("/")[1]}`;
	const onLogoutHandler = useCallback(() => {
		clearLoggedInUser();
		socket.emit("leaveServer", loggedInUser);
		socket.disconnect();
		const res = userDAO.logoutDAO();
		if (res) navigate(BreezeRoutes.LOGINROUTE);
	}, [clearLoggedInUser, loggedInUser, navigate]);

	const sidebarItems = [
		{
			icon: (
				<HiChatBubbleLeftEllipsis
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "Chat",

			navigateTo: BreezeRoutes.CHATROUTE,
		},
		{
			icon: (
				<GiArtificialHive
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "GPT",
			navigateTo: BreezeRoutes.GPTROUTE,
		},
		{
			icon: (
				<MdNewspaper
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "Feed",
			navigateTo: "",
		},
		{
			icon: (
				<HiUserGroup
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "Group",

			navigateTo: "",
		},
		{
			icon: (
				<MdCall
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "Call",

			navigateTo: "",
		},
		{
			icon: (
				<MdSettings
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
					}}
				/>
			),
			text: "Settings",

			navigateTo: "",
		},
	];

	return (
		<aside className='bg-black px-5 flex h-screen'>
			<div
				className='flex flex-col justify-between items-center overflow-y-auto  my-auto w-100% '
				style={{ height: "95vh", maxHeight: "95vh" }}>
				<div className='flex flex-col justify-center items-center'>
					{sidebarItems?.map(({ icon, text, navigateTo }, index) => (
						<div
							className='mb-6 flex flex-col justify-center items-center cursor-pointer'
							key={index}>
							<Link to={navigateTo}>
								<div
									className={`p-2 ${
										urlSplitter === navigateTo && "bg-gray-700"
									} rounded-xl self-center hover:bg-gray-700 hover:rounded-xl tranition duration-300 ease-in-out`}>
									{icon}
								</div>
								<p className='truncate  text-white text-xs text-center'>
									{text}
								</p>
							</Link>
						</div>
					))}
				</div>

				<div className='flex flex-col justify-between items-center'>
					<div
						className='rounded-2xl mb-6'
						onClick={() => {
							showActive();
							showProfile();
						}}>
						<BreezeAvatar
							profileImage={loggedInUser?.profileImage}
							isGrouped={false}
							isActive={ARRAY_METHODS.isElementExist(
								onlineUsers,
								loggedInUser?.userId
							)}
							title={loggedInUser?.name}
						/>
					</div>
					<div className='p-2 rounded-xl bg-gray-700' onClick={onLogoutHandler}>
						<MdOutlinePowerSettingsNew
							style={{
								cursor: "pointer",
								color: `var(--background-color-light)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default BreezeSidebar;
