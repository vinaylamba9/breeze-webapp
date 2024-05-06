import useCombinedStore from "@Zustand/store/store";
import BreezeSidebar from "@Components/breezeSidebar/breezeSidebar.components";
import { Outlet } from "react-router-dom";
import useIsMobile from "@Shared/hooks/useMobile";

const PostOnboardingLayout = () => {
	const { isSideMenu } = useCombinedStore((state) => ({
		isSideMenu: state?.isSideMenu,
	}));
	const isMobile = useIsMobile();
	return (
		<div className=' h-full w-full bg-gray-100  flex items-start justify-start '>
			<div>
				{!isMobile ? <BreezeSidebar /> : isSideMenu ? <BreezeSidebar /> : null}
			</div>

			<div className=' h-full w-full'>
				<Outlet />
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
