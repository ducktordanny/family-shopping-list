require('dotenv').config();

const google = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://localhost:3000/auth/google/callback',
	profileFields: ['id', 'name', 'displayName', 'picture', 'email']
};

const facebook = {
	clientID: process.env.FB_CLIENT_ID,
	clientSecret: process.env.FB_CLIENT_SECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'email'],
	scope: 'email'
};

module.exports = {
	google, facebook
};
