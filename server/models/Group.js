const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
	userIds: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
		maxLength: 16,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Group', groupSchema);
