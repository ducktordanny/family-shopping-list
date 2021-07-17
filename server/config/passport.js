const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const { google, facebook } = require('./strategyOptions');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config/config.env' });
const User = require('../models/User');

module.exports = (passport) => {
	const getToken = (user) => jwt.sign(user, process.env.JWT_SECRET);

	const verifyUser = async (userProfile) => {
		let user = await User.findOne({ clientId: userProfile.clientId }).lean().exec();
		if (!user) {
			const doc = await User.create(userProfile);
			user = doc.toObject();
			console.log('Added new user.');
		} else {
			console.log('User found.');
		}
		const payload = {
			_id: user._id,
			clientId: user.clientId,
		};
		user.token = getToken(payload);
		return user;
	};

	const getGoogleUserProps = (profile) => {
		const { sub: clientId, name, email, picture } = profile._json;
		return {
			clientId, name, email, picture,
			provider: profile.provider
		};
	};

	const getFacebookUserProps = (profile) => {
		const { id: clientId, name, email, picture } = profile._json;
		return {
			clientId, name, email,
			picture: picture.data.url,
			provider: profile.provider
		};
	};

	passport.use(new GoogleStrategy(google,
		async (_accessToken, _refreshToken, profile, done) => {
			const user = await verifyUser(getGoogleUserProps(profile));
			return done(null, user);
		}
	));

	passport.use(new FacebookStrategy(facebook,
		async (_accessToken, _refreshToken, profile, done) => {
			const user = await verifyUser(getFacebookUserProps(profile));
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
