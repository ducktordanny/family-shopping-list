const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {
	getProductByGroupIdWithUsers, getProductById, toggleImportantStatus,

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

router.patch('/important/toggle/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		// ? Do we really need a separated controller for this ?
		await toggleImportantStatus(productId);
		res.json({ msg: 'Success' });
	} catch (err) {
		next(err.message);
	}
});

// TODO: it would be much easier on both the server and client side than making two separated routes for this...
// ! If more user click on the button at the sam time it could cause some weird issues (e.g. if two user mark it as bought, but they "toggle" each other so the product isn't gonna be bought)
router.patch('/bought/toggle/:productId', async (req, res, next) => {
	try {
		// TODO: should make a controller...?
		res.json({ msg: 'Hello World...' });
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
		const prod = await Product.findById(productId);
		const response = await getUsersForProduct(prod);

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
		const prod = await Product.findById(productId);
		const response = await getUsersForProduct(prod);
		res.status(200).json(response);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
