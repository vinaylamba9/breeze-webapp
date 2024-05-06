const BreezeTileSkeleton = ({ tileLength }) => {
	const tileCount = Array.from({ length: tileLength });

	return tileCount.map((_, index) => (
		<div key={index} className='rounded-md p-4 w-full'>
			<div className='animate-pulse flex space-x-4'>
				<div className='rounded-full bg-gray-400 h-12 w-12 opacity-50'></div>
				<div className='flex-1 space-y-4 py-1'>
					<div className='h-4 bg-gray-400 rounded w-3/4 opacity-50'></div>
					<div className='space-y-2'>
						<div className='h-4 bg-gray-400 rounded opacity-50'></div>
						<div className='h-4 bg-gray-400 rounded w-5/6 opacity-50'></div>
					</div>
				</div>
			</div>
		</div>
	));
};

export default BreezeTileSkeleton;
