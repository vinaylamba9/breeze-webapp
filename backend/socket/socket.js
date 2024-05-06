const { CHAT_DB_UTILS } = require("../utils/dbUtils");
const roomHandler = require("./handlers/roomHandler");
const typingHandler = require("./handlers/typingHandler");
const messageHandler = require("./handlers/messageHandler");
const ChatDetailsHandler = require("./handlers/chatDetailsHandler");
global.onlineUsers = [];

const socketIOSetup = (socket, io) => {
	const { user } = socket?.request;

	if (user) {
		console.info("\t 🏃‍♂️  SOCKET STATUS :: CONNECTED [✔️]".green);

		// User joins or open the application
		socket.emit("connected", async () => {
			socket.join(user?.userId);

			//add users to online Users
			if (!onlineUsers?.some((u) => u?.user?.userId === user?.userId))
				onlineUsers?.push({ user: user, socketID: socket.id });
			io.emit("onlineUsers", onlineUsers);
			// const chatByID = await CHAT_DB_UTILS.findByID(user?.userId);
			// io.to(user?.userId).emit("fetchChats", chatByID);
		});

		// Join a chat room
		roomHandler(socket, user, io);
		messageHandler(socket, user, io);
		typingHandler(socket, io);
		ChatDetailsHandler(socket, io);

		socket.on("leaveServer", () => {
			socket.leave(user?.userId);
			socket.disconnect();
			delete socket.request.token;
			delete socket.request.user;
		});
		//socket disconnect
		socket.on("disconnect", () => {
			onlineUsers = onlineUsers?.filter((user) => user?.socketID !== socket.id);
			io.emit("onlineUsers", onlineUsers);
		});
	} else {
		console.info("\t 🏃‍♂️  AUTHENTICATION ERROR:: UNAUTHORIZED [ ❌ ]".red);
		console.info("\t 🏃‍♂️  SOCKET STATUS :: DISCONNECTED [ ❌ ]".red);
		socket.disconnect();
		delete socket.request.token;
		delete socket.request.user;
	}
};
module.exports = socketIOSetup;
