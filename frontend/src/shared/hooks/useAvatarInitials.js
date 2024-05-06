import { useEffect, useState } from "react";

const useAvatarInitials = (name) => {
	const [initials, setInitials] = useState("");

	useEffect(() => {
		const generateInitials = () => {
			const nameParts = name?.split(" ");
			let initials = "";
			if (nameParts?.length > 1) {
				initials =
					nameParts?.[0]?.[0].toUpperCase() + nameParts?.[1]?.[0].toUpperCase();
			} else {
				initials = nameParts?.[0]?.[0].toUpperCase();
			}
			setInitials(initials);
		};
		generateInitials();
	}, [name]);

	return initials;
};

export default useAvatarInitials;
