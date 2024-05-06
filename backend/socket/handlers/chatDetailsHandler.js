const ChatDetailsHandler = (socket, io) => {
	socket.on("updateGroupName", async (obj) => {
		obj?.updatedGroupName?.users?.forEach((item) => {
			io.to(item?._id?.toString()).emit("updatedGroupName", {
				chatID: obj?.updatedGroupName?._id,
				chatName: obj?.updatedGroupName?.chatName,
			});
		});
	});
	socket.on("updateGroupBio", async (obj) => {
		obj?.updatedGroupBio?.users?.forEach((item) => {
			io.to(item?._id?.toString()).emit("updatedGroupBio", {
				chatID: obj?.updatedGroupBio?._id,
				bio: obj?.updatedGroupBio?.bio,
			});
		});
	});
	socket.on("updateGroupImage", async (obj) => {
		obj?.updateGroupImage?.users?.forEach((item) => {
			io.to(item?._id?.toString()).emit("updatedGroupImage", {
				chatID: obj?.updateGroupImage?._id,
				groupImage: obj?.updateGroupImage?.groupImage,
			});
		});
	});
};

module.exports = ChatDetailsHandler;
