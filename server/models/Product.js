const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
	groupId: {
		type: String,
		required: true,
	},
	addedBy: {
		type: String,
		required: true,
	},
	important: {
		type: Boolean,
		default: false,
	},
	content: {
		type: String,
		required: true,
	},
	boughtBy: {
		type: String,
	},
	boughtAt: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Product', productSchema);
