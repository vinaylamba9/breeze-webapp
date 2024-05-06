const path = require("path");
require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const { Server } = require("socket.io");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

/* ================ Configuring UTILITY PACKAGES START  =================*/

const { DB_CONFIG } = require("./config/dbConfig");
const users = require("./routes/userRoutes/index");
const chats = require("./routes/chatRoutes/index");
const message = require("./routes/messageRoutes/index");
const socketIOSetup = require("./socket/socket");
const { userAuth } = require("./middleware/userAuth");
// const Config = require("./config/config.js");

/* ================ Configuring UTILITY PACKAGES END  =================*/

/* ================ Configuring Database START  =================*/
DB_CONFIG.dbInit();
/* ================ Configuring Database END  =================*/

/* ================ Configuring body and Cookie Parser STARTS  =================*/

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public", "build")));
app.use(helmet());

/* ================ Configuring body and Cookie Parser END  =================*/

app.get("/api/chat", (req, res) => {
	res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
	const singleChat = chats.find((ch) => ch._id == req.params.id);
	res.send(singleChat);
});

/* ========================= ROUTES START ==============================*/

// app.use("/", index)              // INDEX ROUTES
app.use("/api/user", users); // USERS ROUTES
app.use("/api/chat", chats); // CHATS ROUTES
app.use("/api/message", message); // MESSAGE ROUTES
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//TODO:-
// app.use(notFound);
// app.use(errorHandle);
/* ========================= ROUTES END ==============================*/

/* ================ Connecting with the PORT STARTS  =================*/

const onListening = () => {
	bootstrapMessage();
};

const bootstrapMessage = () => {
	console.info(
		`\n\t SERVER IS ONLINE [ 📢 ] AND RUNNING [ 🚀 ]  \n
		\n\t - SERVER MODE :: ${process.env.NODE_ENV}
        \n\t -ON PORT :: ${process.env.PORT}
        \n\t -STARTED AT :: ${new Date()}
        \n\t---------------------- LET'S BREEZE LOGS ----------------------\n `
			.rainbow
	);
};

const server = app.listen(process.env.PORT).on("listening", onListening);

/* ================ Connecting with the PORT ENDS  =================*/

/** ================== SOCKET.IO CONNECTION STARTS ================== */
const io = new Server(server, {
	// pingTimeout: process.env.SOCKET_PING_TIMEOUT,
	cors: {
		origin: process.env.BREEZE_URL,
	},
	connectionStateRecovery: {
		// the backup duration of the sessions and the packets
		maxDisconnectionDuration: 2 * 60 * 1000,
		// whether to skip middlewares upon successful recovery
		skipMiddlewares: false,
	},
});
io.use((socket, next) => {
	userAuth.isLoggedInSocket(socket, next);
});

io.on("connection", (socket) => {
	socketIOSetup(socket, io);
});
