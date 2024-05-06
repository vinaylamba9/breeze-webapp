require("dotenv").config();
const nodeMailer = require("nodemailer");
const { replace } = require("node-emoji");
const { MailTemplateTitle, MailSubject } = require("../../constants/mail");
const { CRYPTO_SECRET } = require("../../crypto/cryptoSecret");
const { EMAIL_DB_UTILS } = require("../../utils/dbUtils");
const { EMAIL_UTILS } = require("../../utils/emailUtils");

const EMAIL_SERVICES = {
	sendOTPVerification: async function (userUpdated, verificationType) {
		try {
			let response = await EMAIL_SERVICES.sendEmail(
				userUpdated,
				verificationType,
				[]
			);
			return response;
		} catch (error) {
			return { msg: error, status: "NOT_FOUND" };
		}
	},
	sendEmail: async function (userUpdated, subject, attachements) {
		try {
			const transporter = await EMAIL_SERVICES.createTransporterObject();
			let response = await transporter.sendMail({
				from: process.env.EMAIL_AUTH_USER,
				to: userUpdated.email,
				subject: subject,
				text: `This is the OTP for ${MailSubject.ACCOUNT_VERIFICATION}. Please dont share with others.`,
				html: await EMAIL_SERVICES.getEmailTemplate(userUpdated),
			});
			return response;
		} catch (error) {
			return { msg: error, status: "NOT_FOUND" };
		}
	},
	createTransporterObject: async function () {
		try {
			const transporter = nodeMailer.createTransport({
				host: process.env.EMAIL_AUTH_HOST,
				port: process.env.EMAIL_AUTH_PORT,
				secure: true,
				service: process.env.EMAIL_SERVICE,
				auth: {
					user: process.env.EMAIL_AUTH_USER,
					pass: process.env.EMAIL_AUTH_PASSWORD,
				},
			});
			return transporter;
		} catch (error) {
			return { msg: error, status: "NOT_FOUND" };
		}
	},
	getEmailTemplate: async function (userUpdated) {
		return `
            <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width" />
                        <title>Email Template</title>
                        <link
                        href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
                        rel="stylesheet"
                        />
                        <style>
                        * {
                            margin: 0;
                            padding: 0;
                            font-family: "Ubuntu", sans-serif;
                        }
                        .main {

                            box-shadow: 0px 0px 20px 1px rgba(153, 151, 151, 0.25),
                            0px 0px 20px 1px rgba(114, 112, 112, 0.22);
                            width: 70%;
                            margin: 0 auto;
                            border-radius: 1rem;
                        }
                        .header {
                            margin: 0 auto;
                            width: 100%;
                            background-color: #ffe2b4;
                            border-top-left-radius: 1rem;
                            border-top-right-radius: 1rem;
                        }
                        @media only screen and (max-width: 600px) {
                            .logo{
                                height:150px !important;
                                width:200px !important;
                            }
                            }
                        </style>
                    </head>

                    <body>
                        <div class="main">
                        <div class="header">
                            <center>
                            <img class="logo"
                                src="https://res.cloudinary.com/dtjqyp0r2/image/upload/v1660643211/bkisv2kflru4pcnp5alk.png"
                                height="250px"
                                width="320px"
                            />
                            <h2 style="color: #005459; font-size: 2rem; font-weight: 700">
                                Breeze
                            </h2>
                            </center>

                            <br />
                        </div>
                        <div>
                            <br />
                            <center>
                            <img
                                style="border-radius: 0.5rem"
                                src="https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687718317/9756c2a05e2dd85309fe4b3bc5d62357_rujtem.gif"
                                height="70px"
                                width="90px"
                            />
                            <br />
                            <label style="font-size: 1.5rem; font-weight: bold"
                                >[ OTP for Breeze ]
                            </label>
                            <br />
                            <hr
                                style="width: 50%; text-align: left; margin-left: 0; color: #005459"
                            />
                            <br />
                            <h2>Hi, ${userUpdated.name}</h2>
                            <br />
                            <p>Here is your verification code for activating your account.</p>
                            <br />
                            <h2 style="color: #005459; letter-spacing: 10px">${userUpdated.otp}</h2>
                            <br />
                                    <label style="color: grey; font-size: 0.9rem"
                                >* OTP will expire in 5 min.</label
                            >
                            </center>
                            <br />
                        </div>

                        <br />
                        <div class="footer">
                            <br />
                            <center>
                            <h5 style="color: #005459; font-size: 1.2rem">@Breeze.io</h5>
                            <br />
                            <p style="color: grey">Copyright © 2022 || All rights reserved.</p>
                            </center>
                        </div>
                        </div>
                    </body>
                    </html>


        `;
	},
};

module.exports = {
	EMAIL_SERVICES,
};
