const express = require('express');
const { getGroupById } = require('../controller/groups');
const router = express.Router();
const Group = require('../models/Group');

/**
 * create a new group with the name in the body
 */
router.post('/create', async (req, res, next) => {
	try {
		const { name: newGroupName } = req.body;
		const userId = req.user._id;

		const query = {
			userIds: [userId],
			createdBy: userId,
			name: newGroupName,
		};

		await Group.validate(query).catch((err) => {
			res.status(400);
			next(err.message);
		});
		const group = await Group.create(query);

		const { _id, userIds, createdBy, name, createdAt } = group;
		res.json({ _id, userIds, createdBy, name, createdAt });
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
router.get('/user/:userId', async (req, res) => {
	try {
		const groups = await Group.find({ userIds: req.params.userId },
			['_id', 'userIds', 'createdBy', 'name', 'createdAt']);
		res.json(groups);
	} catch (err) {
		res.status(444).send({ message: err.message });
	}
});

router.get('/:groupId', async (req, res, next) => {
	try {
		const response = await getGroupById(req.params.groupId);
		res.json(response);
	} catch (err) {
		next(err.message);
	}
});

/**
 * if a user authenticated then he/she can joing to a group (with a given group id)
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
			res.status(400).json('You\'re already a member of this group.');
		} else {
			const groupResponse = await Group.findById(groupId);
			res.json(groupResponse);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
