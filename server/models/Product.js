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
	content: {
		type: String,
		required: true,
		maxLength: 100,
	},
	important: {
		type: Boolean,
		default: false,
	},
	boughtBy: {
		type: String,
		default: null,
	},
	boughtAt: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Product', productSchema);
