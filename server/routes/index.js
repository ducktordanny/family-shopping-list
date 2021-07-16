const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const mongoose = require('mongoose');
const User = require('../models/User');
const Group = require('../models/Group');

// basic router
router.get('/', (req, res) => res.render('pages/auth'));
router.get('/error', (req, res) => res.send('Something went wrong.'));

/**
 * user routes
 */
router.post('/groups/create/', ensureAuth, async (req, res) => {
	const { userId, name } = req.body;
	const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
	if (user) {
		await Group.create({ userIds: [userId], name });
		res.send({ status: 200 });
	} else {
		res.status(404);
	}
});

router.get('/groups/all/:userId', ensureAuth, async (req, res) => {
	const { userId } = req.params;

	const groups = await Group.find({ userIds: userId });

	if (groups) {
		res.json(groups);
	} else {
		res.status(404);
	}
});

module.exports = router;
