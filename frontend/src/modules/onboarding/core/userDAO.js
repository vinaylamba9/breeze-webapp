import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service.js";
import { userAPI } from "@API/user/user.API.js";
import { AccountVerified, SessionType } from "@Constants/application.js";
import { HTTPStatusCode } from "@Constants/network.js";
import UserAccountModel from "@Models/userAccount.model.js";
import { errorDebug } from "@Shared/utils/error.utils.js";
import BreezeRoutes from "@Constants/routes";

export const userDAO = {
	loginDAO: async function (userData) {
		try {
			const loginResult = await userAPI.login(userData);

			if (loginResult) {
				const statusCode = loginResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = loginResult.responseBody;
					let _userAccount = new UserAccountModel({
						userId: tempResult?.data?._id,
						name: tempResult?.data?.name,
						email: tempResult?.data?.email,
						profileImage: tempResult?.data?.profileImage,
						isVerified: tempResult?.data?.isVerified,
						accountInItFrom: tempResult?.data?.accountInItFrom,
						accountStatus: tempResult?.data?.accountStatus,
						token: tempResult?.data?.token,
						bio: tempResult?.data?.bio,
					});

					if (_userAccount.isVerified === AccountVerified.NOT_VERIFIED) {
						return {
							statusCode: HTTPStatusCode.UNAUTHORIZED,
							responseBody: "User is not verified.",
						};
						//TODO:- Redirect to OTP Screen
					} else {
						await BreezeSessionManagement.setUserSession(
							JSON.stringify(_userAccount.toJSON())
						);
						await BreezeSessionManagement.setSessionStatus(SessionType.ACTIVE);
						await BreezeSessionManagement.setAPIKey(_userAccount["token"]);
						return {
							statusCode: statusCode,
							responseBody: _userAccount,
						};
					}
				} else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					return loginResult;
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return loginResult;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return loginResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.loginDAO");
		}
	},
	signupDAO: async function (userData) {
		try {
			const signupResult = await userAPI.signup(userData);
			if (signupResult) {
				const statusCode = signupResult["statusCode"];
				if (statusCode === HTTPStatusCode.CREATED) {
					return signupResult;
				} else if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: HTTPStatusCode.OK,
						responseBody: signupResult?.responseBody,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return signupResult;
				}
			}
			return signupResult;
		} catch (error) {
			return errorDebug(error, "userDAO.signupDAO");
		}
	},
	verifyOTPDAO: async function (userData) {
		try {
			const verifyOTPResponse = await userAPI.verifyOTP(userData);
			if (verifyOTPResponse) {
				const statusCode = verifyOTPResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return verifyOTPResponse;
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return {
						statusCode: HTTPStatusCode.FORBIDDEN,
						responseBody: verifyOTPResponse?.responseBody,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return verifyOTPResponse;
				}
			}
			return verifyOTPResponse;
		} catch (error) {
			return errorDebug(error, "userDAO.verifyOTPDAO");
		}
	},
	forgotPasswordDAO: async function (userData) {
		try {
			const forgotPasswordResult = await userAPI.forgotPassword(userData);
			if (forgotPasswordResult) {
				const statusCode = forgotPasswordResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: statusCode,
						responseBody: forgotPasswordResult.responseBody.data,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return forgotPasswordResult;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.NOT_FOUND
				) {
					return forgotPasswordResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.forgotPasswordDAO");
		}
	},
	resendOTPDAO: async function (userData) {
		try {
			const resendOTPResponse = await userAPI.resendOTP(userData);
			if (resendOTPResponse) {
				const statusCode = resendOTPResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: statusCode,
						responseBody: resendOTPResponse.responseBody.data,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return resendOTPResponse;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return resendOTPResponse;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.resendOTPDAO");
		}
	},
	updatePasswordDAO: async function (userData) {
		try {
			const updatePasswordResult = await userAPI.updatePassword(userData);
			if (updatePasswordResult) {
				const statusCode = updatePasswordResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: statusCode,
						responseBody: updatePasswordResult.responseBody.data,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return updatePasswordResult;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return updatePasswordResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.updatePasswordDAO");
		}
	},
	getAllUsersDAO: async function () {
		try {
			const allUserResponse = await userAPI.getAllUsers();
			if (allUserResponse) {
				const statusCode = allUserResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = allUserResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return allUserResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return allUserResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "userDAO.getAllUsersDAO()");
		}
	},
	updateUserDetailsDAO: async function (userDetails) {
		try {
			const updatedUserResponse = await userAPI.updateUserDetails(userDetails);
			if (updatedUserResponse) {
				const statusCode = updatedUserResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = updatedUserResponse.responseBody?.data;

					let _userAccount = new UserAccountModel({
						userId: tempResult?._id,
						name: tempResult?.name,
						email: tempResult?.email,
						profileImage: tempResult?.profileImage,
						isVerified: tempResult?.isVerified,
						accountInItFrom: tempResult?.accountInItFrom,
						accountStatus: tempResult?.accountStatus,
						token: tempResult?.token,
						bio: tempResult?.bio,
					});

					await BreezeSessionManagement.deleteUserSession();
					await BreezeSessionManagement.setUserSession(
						JSON.stringify(_userAccount.toJSON())
					);
					return {
						statusCode: statusCode,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return updatedUserResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return updatedUserResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "UserDAO.updateUserDetailsDAO()");
		}
	},
	logoutDAO: async function () {
		try {
			let response = BreezeSessionManagement.deleteAllSession();
			return response && response;
		} catch (error) {
			return errorDebug(error, "UserDAO.logoutDAO");
		}
	},
};
