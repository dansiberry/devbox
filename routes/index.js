const express = require('express');
const router = express.Router();
var User = require('../models/user')

//homepage
router.get('/', (req, res) => {
    res.locals.prompt = "Some database values"
    res.render('index', {title: 'Leanbox'});
  });

//sign-in get
router.get('/sign-in', (req, res) => {
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
router.post('/register', (req, res, next) => {
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
router.get('/register', (req, res) => {
    // res.locals.prompt = "Some database values"
    res.render('register')
  })

//user profile
router.get('/profile', (req, res, next) => {
    // res.locals.prompt = "Some database values"
    if (!req.session.userId) {
     const err = new Error('You are not signed in');
     return next(err);
    }
    User.findById(req.session.userId).exec(function(error, user) {
      if(error){
        return next(error);
      }
      else {
        res.render('profile', {title: 'profile', email: user.email});
      }
    })
  })

module.exports = router;
