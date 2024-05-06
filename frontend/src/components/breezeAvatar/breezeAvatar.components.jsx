import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";
import useAvatarInitials from "@Shared/hooks/useAvatarInitials";

const BreezeAvatar = ({
	onClickHandler,
	profileImage,
	isGrouped,
	isActive,
	title,
	isProfileMode,
}) => {
	const [hexColor, textColor] = useAvatarColorGenerator(title);
	const initials = useAvatarInitials(title);

	return isProfileMode ? (
		<div className='relative cursor-pointer ' onClick={onClickHandler}>
			<>
				<div
					className={
						!!profileImage
							? `rounded-full p-2 `
							: `p-2  h-36 w-36 relative flex justify-center items-center rounded-full  text-xl uppercase`
					}
					style={{
						backgroundColor: hexColor,
						color: textColor,
					}}>
					{!!profileImage ? (
						<img
							className='h-32 w-32  rounded-full'
							src={profileImage}
							alt='profile'
						/>
					) : (
						<h1 className='text-fontsize-strong text-bold drop-shadow-md'>
							{initials}
						</h1>
					)}
				</div>
			</>
		</div>
	) : (
		<div className='relative cursor-pointer ' onClick={onClickHandler}>
			<>
				<div
					className={
						!!profileImage
							? `rounded-full p-1 `
							: `p-2  h-11 w-11 relative flex justify-center items-center rounded-full	  text-xl uppercase`
					}
					style={{
						backgroundColor: hexColor,
						color: textColor,
					}}>
					{!!profileImage ? (
						<img
							className='h-9 w-9 rounded-full'
							src={profileImage}
							alt='profile'
						/>
					) : (
						initials
					)}
				</div>
				{!isGrouped ? (
					isActive ? (
						<span className='bottom-0 right-0 absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-2xl'></span>
					) : (
						<span className='bottom-0 right-0 absolute  w-3 h-3 bg-gray-400 border-2 border-white dark:border-gray-800 rounded-2xl'></span>
					)
				) : null}
			</>
		</div>
	);
};

export default BreezeAvatar;
