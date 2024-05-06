const BreezeLoader = ({
	isLoading,
	height = "h-10",
	width = "w-10",
	loaderColor,
	children,
}) => {
	return (
		<div>
			{isLoading ? (
				<div className='flex items-center justify-center h-full'>
					<div
						className={`animate-spin rounded-full ${height} ${width} border-t-4 border-${loaderColor} border-solid`}></div>
				</div>
			) : (
				children
			)}
		</div>
	);
};

export default BreezeLoader;
