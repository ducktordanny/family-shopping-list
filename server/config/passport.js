const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const { google, facebook } = require('./strategyOptions');

module.exports = (passport, userProfile) => {
	passport.use(new GoogleStrategy(google,
		(accessToken, refreshToken, profile, done) => {
			const { sub: clientId, name, email, picture } = profile._json;
			userProfile = {
				clientId, name, email, picture,
				provider: profile.provider
			};
			return done(null, userProfile);
		}
	));

	passport.use(new FacebookStrategy(facebook,
		(accessToken, refreshToken, profile, done) => {
			const { id: clientId, name, email, picture } = profile._json;
			userProfile = {
				clientId, name, email,
				picture: picture.data.url,
				provider: profile.provider
			};
			return done(null, userProfile);
		}
	));

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});

	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});

	return userProfile;
}