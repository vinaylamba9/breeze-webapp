import { InputType } from "@Constants/application";

const BreezeImageVideoAttachements = ({
	fileUploadName,
	fileUplaodID,
	fileAcceptType,
	isMultiple,
	icon,
	label,
}) => {
	const fileUplaodHandler = (e) => {
		let filesToUpload = Array.from(e?.target?.files);
		filesToUpload?.map((item) => console.log(item));
		filesToUpload?.forEach((file) => {
			if (
				(file.type !== "image/png" &&
					file.type !== "image/jpeg" &&
					file.type !== "image/gif" &&
					file.type !== "image/webp") ||
				file.size > 1024 * 1024 * 5
			) {
				return;
			} else {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					console.log(e.target.result);
				};
			}
		});
	};
	return (
		<div>
			<input
				placeholder={fileUploadName}
				type={InputType.FILE}
				className='hidden'
				id={fileUplaodID}
				multiple={isMultiple}
				name={fileUploadName}
				accept={fileAcceptType}
				onChange={fileUplaodHandler}
			/>
			<label className='flex gap-2 cursor-pointer ' htmlFor={fileUplaodID}>
				{icon}
				<span className='group-hover:text-color-darkTeal group-hover:font-medium transition-all ease-out duration-300 '>
					{label}
				</span>
			</label>
		</div>
	);
};

export default BreezeImageVideoAttachements;
