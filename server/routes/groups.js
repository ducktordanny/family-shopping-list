const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

/**
 * create a new group with the name in the body
 */
router.post('/create', async (req, res, next) => {
	try {
		const { name } = req.body;
		const userId = req.user._id;

		const query = {
			userIds: [userId],
			createdBy: userId,
			name
		};

		await Group.validate(query).catch((err) => {
			res.status(400);
			next(err.message);
		});
		const groups = await Group.create(query);
		res.json(groups);
	} catch (err) {
		next(err.message);
	}
});

/**
 * list all groups
 */
router.get('/all', async (req, res, next) => {
	try {
		const groups = await Group.find();
		res.json(groups);
	} catch (err) {
		next(err.message);
	}
});

/**
 * find all groups where the give user is included
 */
router.get('/:userId', async (req, res) => {
	try {
		const groups = await Group.find({ userIds: req.params.userId });
		res.json(groups);
	} catch (err) {
		res.status(444).send({ message: err.message });
	}
});

/**
 * if a user authenticated then he/she can joing to a group (with a give group id)
 */
router.patch('/join/:groupId', async (req, res, next) => {
	try {
		const { groupId } = req.params;
		const userId = req.user._id;

		const response = await Group.updateOne(
			{ _id: groupId },
			{ $addToSet: { userIds: userId } }
		);

		if (response.nModified === 0) {
			res.sendStatus(304);
		} else {
			res.sendStatus(200);
		}
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
