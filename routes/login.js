/*
    POST /login -> authentificate in the system
    GET /       -> get to the login page
    The functions passport.use, passport.serializeUser, passport.deserializeUser are taken from the
    official documentation http://www.passportjs.org/docs and adapted to the User model of this system
*/

const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('./../server/models/user.js');

/*
    GET / -> get to the login page
*/
router.get('/', (req, res) => {
    res.render('login', {layout: false});
});

/*
    POST /login -> authenticate the user
*/
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/',
        failureFlash: true
    }), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/app');
    }
);


// the Middleware for authentication -> provided by the passport library

x = passport.use(new LocalStrategy(

  function(username, password, done) {

      console.log(username)
      console.log(password)

      /*Lookup the username, if it exists compare the password*/
      User.getUserByUsername(username, function(err, user) {
          if (err) {
              throw err;
          }
          if (! user) {
              //     done(error, found the user)
              return done(null, false, {message: "Unknown User"});
          }

          User.comparePassword(password, user.password, function (err, isMatch) {
              if (err) {
                  throw err;
              }
              if (isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false, 'Invalid password');
              }
          });
      });


  }));



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

module.exports = router;
