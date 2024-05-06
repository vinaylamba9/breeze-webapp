import { useCallback, useEffect, useState } from "react";
import { MdGroup } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { useForm } from "react-hook-form";
import BreezeImageUpload from "@Components/breezeImageUpload/breezeImageUpload.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { InputType } from "@Constants/application";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import { useCreateGroupState } from "@Context/createGroupProvider";
const StepperOne = ({ handleNext }) => {
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		formState: { errors },
	} = useForm({});
	const { formDetails, setFormDetails } = useCreateGroupState();

	const [groupImageURL, setGroupImageURL] = useState(null);

	const onClickNextHandler = useCallback(
		(d) => {
			setFormDetails({
				...formDetails,
				name: d?.groupName,
				bio: d?.groupBio,
				groupImage: groupImageURL,
			});
			handleNext();
		},
		[formDetails, groupImageURL, handleNext, setFormDetails]
	);

	useEffect(() => {
		setValue("groupName", formDetails?.name);
		setValue("groupBio", formDetails?.bio);
	}, [setValue, formDetails]);

	return (
		<div className='mt-5 w-60% sm:w-100% md:w-100% xs:w-100% mx-auto '>
			<BreezeImageUpload setGroupImageURL={setGroupImageURL} />
			<div className='mt-5 w-100% '>
				<div className='my-5'>
					<BreezeInputField
						type={InputType.TEXT}
						name='groupName'
						register={register}
						trailingIcon={
							<MdGroup
								style={{
									color: `var(--background-color-black)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						errors={errors}
						validationSchema={{
							required: "Please enter group name .",
						}}
						onChangeHandler={(e) => {
							setFormDetails({ ...formDetails, name: e.target.value });
						}}
						placeholder='Group name'
						required
						// iconStyle={"cursor-pointer absolute right-60"}
					/>
				</div>
				<div className='my-5'>
					<BreezeInputField
						type={InputType.TEXT}
						name='groupBio'
						register={register}
						trailingIcon={
							<MdOutlineSubtitles
								style={{
									color: `var(--background-color-black)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						onChangeHandler={(e) => {
							setFormDetails({ ...formDetails, bio: e.target.value });
						}}
						placeholder='Group bio'
						// iconStyle={"cursor-pointer absolute right-60"}
					/>
				</div>
			</div>
			{watch("groupName")?.length > 0 && (
				<BreezeButton
					buttonClass={"py-4 mt-2 mb-2"}
					label={"Next Step"}
					backgroundColor={`var(--background-color-dark)`}
					textColor={`var(--text-color-purity)`}
					onClickHandler={handleSubmit(onClickNextHandler)}
				/>
			)}
		</div>
	);
};

export default StepperOne;
