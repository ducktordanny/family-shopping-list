const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');

/**
 * find a given user by id
 */
router.get('/:userId', async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		res.json(user);
	} catch (err) {
		next(err.message);
	}
});

/**
 * by passing the groupId it returns all the users of the given group
 */
router.get('/group/:groupId', async (req, res, next) => {
	try {
		const { groupId } = req.params;
		const group = await Group.findById(groupId);
		const response = await User.find({ _id: { $in: group.userIds } });
		res.json(response);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
