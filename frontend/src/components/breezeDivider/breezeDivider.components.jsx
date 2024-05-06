const BreezeDivider = ({ borderColor, isDashed }) => {
	return (
		<hr
			className={`border ${isDashed && "border-dashed"} ${
				borderColor || "border-gray-100"
			}`}
		/>
	);
};

export default BreezeDivider;
