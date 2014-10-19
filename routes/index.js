var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello App' });
});

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

/* GET logout page */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/'
}));

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}