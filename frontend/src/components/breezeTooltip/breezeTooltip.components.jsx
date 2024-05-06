import { Tooltip } from "react-tooltip";
const { Fragment } = require("react");

const BreezeTooltip = ({ children, id, place }) => {
	return (
		<Fragment>
			<a>{children}</a>
			<Tooltip id={id} className='z-40' place={place} />
		</Fragment>
	);
};

export default BreezeTooltip;
