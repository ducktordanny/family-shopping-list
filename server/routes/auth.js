const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/mobile/google',
	passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/error' }),
	(req, res) => {
		res.redirect(`shrouplist://login?user=${JSON.stringify(req.user)}`);
	});

router.get('/mobile/facebook',
	passport.authenticate('facebook', { session: false }));

router.get('/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/error' }),
	(req, res) => {
		res.redirect(`shrouplist://login?user=${JSON.stringify(req.user)}`);
	});

module.exports = router;
