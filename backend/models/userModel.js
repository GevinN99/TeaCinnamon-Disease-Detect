const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profileImage: {
		type: String,
		default: "https://www.w3schools.com/w3images/avatar2.png",
	},
	homeLocation: {
		type: {
			latitude: { type: Number },
			longitude: { type: Number },
			address: { type: String },
		},
		default: null,
	},
	createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;