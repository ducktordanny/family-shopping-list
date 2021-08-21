const Product = require('../models/Product');
const { getUsersForProduct } = require('./users');

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

module.exports = {
	getProductById,
	getProductByGroupIdWithUsers,
};
