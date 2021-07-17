const express = require('express');
const router = express.Router();
const { authToken } = require('../middleware/auth');
// const User = require('../models/User');

router.post('/', authToken, (req, res) => {
	// const userId = req.user._id;
	// const user = 
	res.sendStatus(200);
});

module.exports = router;
