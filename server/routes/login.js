const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
	try {
		const userId = req.user._id;
		const result = await User.findById(userId);
		res.status(200).json(result);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
