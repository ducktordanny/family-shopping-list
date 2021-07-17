const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	clientId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
