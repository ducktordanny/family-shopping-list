const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {
	getProductByGroupIdWithUsers, getProductById,

} = require('../controller/product');
const { getUsersForProduct } = require('../controller/users');

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await getProductById(id);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

/**
 * its body requires a groupId and a content
 * @required
 * @groupId
 * @content
 */
router.post('/create', async (req, res, next) => {
	try {
		const { groupId, content } = req.body;
		const query = {
			groupId,
			content,
			addedBy: req.user._id,
		};
		await Product.validate(query).catch((err) => {
			res.status(400);
			next(err.message);
		});
		const newProduct = await Product.create(query);
		const response = await getUsersForProduct(newProduct);
		res.status(200).json(response);
	} catch (err) {
		next(err.message);
	}
});

/**
 * by passing the groupId it returns all the added products of the given group
 */
router.get('/group/:groupId', async (req, res, next) => {
	try {
		const { groupId } = req.params;
		const response = await getProductByGroupIdWithUsers(groupId);

		res.status(200).json(response);
	} catch (err) {
		next(err.message);
	}
});

/**
 * mark a given product as bought
 */
router.patch('/bought/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		await Product.findOneAndUpdate({ _id: productId }, { boughtBy: req.user._id, boughtAt: new Date() });
		const response = await Product.findById(productId);
		res.status(200).json(response);
	} catch (err) {
		next(err.message);
	}
});

/**
 * remove a bought mark of a given product
 */
router.patch('/unbought/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		await Product.findOneAndUpdate({ _id: productId }, { boughtBy: null, boughtAt: null });
		const response = await Product.findById(productId);
		res.status(200).json(response);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
