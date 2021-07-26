const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		res.status(200).json(req.user);
	} catch (err) {
		next(err.message);
	}
});

module.exports = router;
