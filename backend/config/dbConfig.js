require("dotenv").config();
const mongoose = require("mongoose");

const DB_CONFIG = {
	dbInit: function () {
		try {
			mongoose.connect(process.env.DB_CONNECTION_STRING, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			const dbConnection = mongoose.connection;

			/* ================ Binding connection to event (to get notification of connection )  =================*/
			dbConnection.on(
				"error",
				console.error.bind(console, "DB STATUS :: ERROR: [ ❌ ]")
			);
			dbConnection.on(
				"connecting",
				console.info.bind(
					console,
					"DB STATUS :: CONNECTING............. [ 🏃‍♂️ ]"
				)
			);
			dbConnection.on(
				"connected",
				console.info.bind(console, "\t 🏃‍♂️  DB STATUS :: CONNECTED [✔️]".green)
			);
		} catch (error) {
			dbConnection.on(
				"error",
				console.error.bind(console, "DB STATUS :: ERROR: [ ❌ ]")
			);
			console.log(error);
			process.exit();
		}
	},
	check: function () {
		console.log("Test DONE");
	},
};

module.exports = { DB_CONFIG };
