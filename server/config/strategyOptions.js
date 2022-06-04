require('dotenv').config();

const google = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: (process.env.NODE_ENV === 'developement'
		? 'http://localhost:3000'
		: 'https://shrouplist.herokuapp.com')
		+ '/auth/google/callback',
	profileFields: ['id', 'name', 'displayName', 'picture', 'email']
};

const facebook = {
	clientID: process.env.FB_CLIENT_ID,
	clientSecret: process.env.FB_CLIENT_SECRET,
	callbackURL: (process.env.NODE_ENV === 'developement'
		? 'http://localhost:3000'
		: 'https://shrouplist.herokuapp.com')
		+ '/auth/facebook/callback',
	profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'email'],
	scope: 'email'
};

module.exports = {
	google, facebook
};
