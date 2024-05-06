export default class UserAccountModel {
	constructor(data) {
		this.userId = data.userId;
		this.name = data.name;
		this.email = data.email;
		this.profileImage = data.profileImage;
		this.isVerified = data.isVerified;
		this.accountInItFrom = data.accountInItFrom;
		this.accountStatus = data.accountStatus;
		this.token = data.token;
		this.bio = data.bio;
	}

	toJSON() {
		return {
			userId: this.userId,
			name: this.name,
			email: this.email,
			profileImage: this.profileImage,
			isVerified: this.isVerified,
			accountInItFrom: this.accountInItFrom,
			accountStatus: this.accountStatus,
			token: this.token,
			bio: this.bio,
		};
	}
}
