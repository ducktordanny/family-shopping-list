const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/error' }),
	(req, res) => {
		console.log(req.user);
		res.redirect(`OAuthLogin://login?user=${JSON.stringify(req.user)}`);
	});

router.get('/facebook',
	passport.authenticate('facebook'));

router.get('/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/error' }),
	(req, res) => {
		res.redirect(`OAuthLogin://login?user=${JSON.stringify(req.user)}`);
	});

module.exports = router;
