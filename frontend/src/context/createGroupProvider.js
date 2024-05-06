import { createContext, useContext, useState } from "react";
const CreateGroupContext = createContext();

const CreateGroupProvider = ({ children }) => {
	const [formDetails, setFormDetails] = useState({
		name: null,
		bio: null,
		groupImage: null,
		users: [],
		profileImage: null,
	});

	return (
		<CreateGroupContext.Provider value={{ formDetails, setFormDetails }}>
			{children}
		</CreateGroupContext.Provider>
	);
};

export const useCreateGroupState = () => useContext(CreateGroupContext);
export default CreateGroupProvider;
