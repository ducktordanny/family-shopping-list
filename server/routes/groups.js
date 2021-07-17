const express = require('express');
const router = express.Router();
const { authToken } = require('../middleware/auth');
const mongoose = require('mongoose');
const User = require('../models/User');
const Group = require('../models/Group');

router.post('/create/', authToken, async (req, res) => {
	const { name } = req.body;
	const userId = req.user._id;
	const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
	if (user) {
		const groups = await Group.create({ userIds: [mongoose.Types.ObjectId(userId)], name });
		res.json(groups);
	} else {
		res.sendStatus(404);
	}
});

router.get('/all/', authToken, async (req, res) => {
	const groups = await Group.find({ userIds: req.user._id });

	if (groups) {
		res.json(groups);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
