const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

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
		const response = await Product.create(query);
		res.status(200);
		res.json(response);
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
		const response = await Product.find({ groupId });
		res.json(response);
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
		res.status(200);
		res.json(response);
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
		res.status(200);
		res.json(response);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
