const jwt = require('jsonwebtoken');

// ? http://www.passportjs.org/packages/passport-accesstoken/
module.exports = {
	authToken: async (req, res, next) => {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(' ')[1];
		if (token === null) return res.sendStatus(401);
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				console.error(err);
				return res.sendStatus(403);
			}
			req.user = user;
			return next();
		});
	}
};
