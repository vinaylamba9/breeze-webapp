const typingHandler = (socket, io) => {
	socket.on("typing", (selectedChat) => {
		socket.to(selectedChat).emit("typing");
	});
	socket.on("stopTyping", (selectedChat) => {
		socket.to(selectedChat).emit("stopTyping");
	});
};

module.exports = typingHandler;
