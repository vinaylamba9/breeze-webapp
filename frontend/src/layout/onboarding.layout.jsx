import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
	return (
		<div className='h-screen flex items-center'>
			<div className='flex w-99% justify-between m-auto h-98% '>
				<div className='xs:w-100% sm:w-100% md:w-100% lg:w-45% xl:w-35% 2xl:w-35% overflow-y-auto rounded-2xl'>
					<Outlet />
				</div>
				<div
					className='xs:w-0 sm:w-0 flex-1 md:w-0% lg:w-55% xl:w-65% 2xl:w-65% rounded-2xl  bg-no-repeat bg-origin-content bg-cover bg-bottom'
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/dtjqyp0r2/image/upload/v1690787526/li-zhang-xRRQlR8Qu-Y-unsplash_ufpdzj.jpg)",
					}}></div>
			</div>
		</div>
	);
};

export default OnboardingLayout;
