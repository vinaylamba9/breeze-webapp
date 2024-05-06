import { createContext, useContext, useEffect, useState } from "react";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [selectedChat, setSelectedChat] = useState(null);
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		let userInfo = BreezeSessionManagement.getUserSession();
		setUser(userInfo);
	}, []);

	return (
		<ChatContext.Provider
			value={{
				user,
				setUser,
				selectedChat,
				setSelectedChat,
				userList,
				setUserList,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatState = () => useContext(ChatContext);

export default ChatProvider;
