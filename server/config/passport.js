const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const { google, facebook } = require('./strategyOptions');
const User = require('../models/User');

module.exports = (passport) => {
	const verifyUser = async (userProfile) => {
		let user = await User.findOne({ clientId: userProfile.clientId });
		if (!user) {
			console.log('Register new user');
			user = await User.create(userProfile);
		}
		return user;
	};

	passport.use(new GoogleStrategy(google,
		async (accessToken, refreshToken, profile, done) => {
			console.log(accessToken, refreshToken);
			const { sub: clientId, name, email, picture } = profile._json;
			let userProfile = {
				clientId, name, email, picture,
				provider: profile.provider
			};

			const user = await verifyUser(userProfile);
			return done(null, user);
		}
	));

	passport.use(new FacebookStrategy(facebook,
		async (accessToken, refreshToken, profile, done) => {
			const { id: clientId, name, email, picture } = profile._json;
			let userProfile = {
				clientId, name, email,
				picture: picture.data.url,
				provider: profile.provider
			};

			const user = await verifyUser(userProfile);
			return done(null, user);
		}
	));

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});

	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});
};
