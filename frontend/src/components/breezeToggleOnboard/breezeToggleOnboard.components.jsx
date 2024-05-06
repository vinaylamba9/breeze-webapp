import { Link } from "react-router-dom";

const BreezeToggleOnboard = ({ label, linkLabel, link }) => {
	return (
		<div className='mt-5% text-fontsize-brittle mr-10% self-end'>
			<p className='text-fontsize-brittle text-text-color-dark'>
				{label}
				<b>
					<Link
						className='text-color-darkTeal ease-out duration-300 cursor-pointer no-underline hover:tracking-wide'
						to={link}>
						{linkLabel}
					</Link>
				</b>
			</p>
		</div>
	);
};

export default BreezeToggleOnboard;
