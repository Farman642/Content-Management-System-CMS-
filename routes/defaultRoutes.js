const express = require('express');
const router = express.Router();
const defaultController = require('../controller/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
});


// noinspection JSCheckFunctionSignatures
router.route('/').get(defaultController.index);


// Defining Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}).then(User => {
        if (!User) {
            return done(null, false, req.flash('error-message', 'User not found with this email.'));
        }

        bcrypt.compare(password, User.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'));
            }

            return done(null, User, req.flash('success-message', 'Login Successful'));
        });

    });
}));

passport.serializeUser(function(User, done) {
    done(null, User.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, User) {
        done(err, User);
    });
});


// noinspection JSCheckFunctionSignatures
router.route('/login')
    .get(defaultController.login)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }) ,defaultController.loginPost);


// noinspection JSCheckFunctionSignatures
router.route('/register').get(defaultController.registerGet).post(defaultController.registerPost);

router.route('/post/:id').get(defaultController.singlePost);




module.exports = router;