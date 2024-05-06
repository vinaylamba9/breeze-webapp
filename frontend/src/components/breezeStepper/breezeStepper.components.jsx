import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";

const BreezeStepper = ({ stepperList, currentStep }) => {
	return (
		<div>
			<BreezeDivider isDashed={true} />
			<div className='flex justify-center items-center mx-auto mt-5 '>
				{stepperList?.map((step, i) => {
					return (
						<>
							<div
								key={i}
								className={`text-fontsize-pool px-6 py-2 m-2 bg-color-slate rounded-2xl cursor-pointer transition-all duration-200 ${
									i + 1 === currentStep &&
									"bg-black text-background-color-light animate-pulse"
								} ${
									i + 1 < currentStep && "bg-black text-background-color-light "
								}`}>
								{step?.label}
							</div>
							{i < stepperList?.length - 1 && (
								<div className='w-30%'>
									<BreezeDivider
										borderColor={
											i + 1 === currentStep - 1 &&
											"border-color-darkTeal ease-in"
										}
									/>
								</div>
							)}
						</>
					);
				})}
			</div>

			<div>{stepperList[currentStep - 1]?.component}</div>
		</div>
	);
};

export default BreezeStepper;
