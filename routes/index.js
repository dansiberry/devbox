const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Kit = require('../models/kit');
//tells express to load index.js file
const mid = require('../middleware');
const util = require('util');

router.use('/', require('./kits'))

//homepage
router.get('/', (req, res, next) => {

// User.findOne({ 'email': 'master@master.com' }, function (err, person) {
//   if (err) return next(err);
//   console.log(person.id);
// })
    res.locals.prompt = "Some database values"
    res.render('index', {title: 'Leanbox'});
  });

//kits api
router.get('/api', (req, res, next) => {
    Kit.find({}, function(err, kits){
      if(err) return next(err);
      res.json(kits);
    })
});

//sign-in get
router.get('/sign-in', mid.mustBeLoggedOut, (req, res) => {
    res.render('sign-in', {title: 'sign in'});
  });

//sign-in post
router.post('/sign-in', (req, res, next) => {
    if (req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function(error, user){
         if(error || !user){
          const err = new Error("Wrong email or password");
          return next(err);
         } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
         }
      })
    }
    else {
      const err = new Error('All fields required');
      return next(err);
    }
  });

//sign-out get
router.get('/sign-out', (req, res, next) => {
    if(req.session) {
      req.session.destroy(function(error){
        if(error){
          return next(error);
        }
        else {
          res.redirect('/');
        }
      })
    }
  });

//user create
router.post('/register', mid.mustBeLoggedOut, (req, res, next) => {
    // res.locals.prompt = "Some database values"
    // Check all fields are given
    if (req.body.email &&
        req.body.password &&
        req.body.confirmPassword){

      //check passwords match
      if (req.body.password !== req.body.confirmPassword){
        const err = new Error('passwords do not match');
        return next(err); }

      //successful submittion action
      userData = {
        email: req.body.email,
        password: req.body.password }
      User.create(userData, function(error, user) {
        if (error) {
          return next(error) }
        else {
          req.session.userId = user._id;
          res.redirect('/profile') }
      });
    }
    else {
      const err = new Error('All fields required');
      return next(err);
    }
  })

//user new
router.get('/register', mid.mustBeLoggedOut, (req, res) => {
    // res.locals.prompt = "Some database values"
    res.render('register')
  })

//user profile
router.get('/profile', mid.mustBeLoggedIn, (req, res, next) => {
       Kit.find({user: res.locals.currentUser}).populate('sections').populate('resources').exec( function (err, kits){
        if(err){
          next(error);
        }
        else {
         let count = 0
         for(i=0; i<kits.length; i++ ){
           kits[i].count = 0
           for(z=0; z<kits[i].sections.length; z++) {
             kits[i].count += kits[i].sections[z].resources.length
           }
         }
         res.render('profile', {title: 'profile', user: res.locals.currentUser, userKits: kits, count: count});
        }
      });
});

module.exports = router;


