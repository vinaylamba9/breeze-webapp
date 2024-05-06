require("dotenv").config();
const crypto = require("crypto");
const iv = crypto.randomBytes(16);

const CRYPTO_SECRET = {
	encrypt: function (text) {
		try {
			const CIPHER = crypto.createCipheriv(
				process.env.CRYPTO_ALGORITHM,
				process.env.CRYPTO_SECRET,
				iv
			);
			const encrypted = Buffer.concat([CIPHER.update(text), CIPHER.final()]);
			return {
				iv: iv.toString("hex"),
				content: encrypted.toString("hex"),
			};
		} catch (error) {
			console.error("error at encrypt " + error.toString().errorTitle);
			throw "Unable to encrypt data";
		}
	},
	decrypt: function (hash) {
		try {
			const CIPHER = crypto.createCipheriv(
				process.env.CRYPTO_ALGORITHM,
				process.env.CRYPTO_SECRET,
				Buffer.from(hash.iv, "hex")
			);
			const decrypted = Buffer.concat([
				CIPHER.update(Buffer.hash(hash.content, "hex")),
				CIPHER.final(),
			]);
			return decrypted.toString();
		} catch (error) {
			console.error("error at decrypt " + e.toString().errorTitle);
			throw "Unable to decrypt data";
		}
	},
};

module.exports = {
	CRYPTO_SECRET,
};
