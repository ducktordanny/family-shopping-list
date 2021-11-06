const Product = require('../models/Product');
const { getUsersForProduct } = require('./users');

// TODO: should write doc comments...

const getProductById = async (id) => {
	const product = await Product.findById(id);
	const response = await getUsersForProduct(product);

	return response;
};

const getProductByGroupIdWithUsers = async (id) => {
	const products = await Product.find({ groupId: id }, [
		'_id', 'content', 'important',
		'addedBy', 'boughtBy',
		'boughtAt', 'createdAt'
	]);
	const response = products.map(getUsersForProduct);

	return await Promise.all(response);
};

/**
 * Renames the given product's content.
 * @param {string} id 
 * @param {string} newContent
 */
const renameProductById = async (id, content) => {
	// should implement it...
	console.log(id, content);
	const response = await Product.updateOne({ _id: id }, { content });
	return response.nModified;
};

/**
 * Toggles a product's important status and returns it.
 * @param {string} id 
 */
const toggleImportantStatus = async (id) => {
	const { important } = await Product.findById(id, ['important']);
	await Product.findByIdAndUpdate(id, { important: !important });
};

module.exports = {
	getProductById,
	getProductByGroupIdWithUsers,
	renameProductById,
	toggleImportantStatus
};
