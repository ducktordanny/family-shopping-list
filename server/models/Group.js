const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
	userIds: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Group', groupSchema);
