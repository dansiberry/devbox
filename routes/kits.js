const express = require('express');
const router = express.Router();
const Kit = require('../models/kit');
const User = require('../models/user');
const Section = require('../models/section');
const Resource = require('../models/resource');
const mid = require('../middleware');
const routes = require('./index.js');
const util = require('util');



//kits index
router.get('/kits', (req, res, next) => {
   Kit.find({}, function (err, kits){
        if(err){
          next(error);
        }
        else {
          res.render('kit-index',
           {title: 'kits',
            user: res.locals.currentUser,
            kits: kits
           });
        }
    })
 })

//kits new
router.get('/kits/new', (req, res) => {
    res.render('kit-new')
  })

//kits create
router.post('/kits/new', (req, res, next) => {
   console.log(util.inspect(req.body, {showHidden: false, depth: null}))
       // console.log(req.body);
   if (req.body.kitTitle &&
      req.body.kitContent &&
      req.body.sections[0].sectionTitle){
      Kit.createKit(req, res, next);
   }
    else {
       const err = new Error('All fields are required');
       return next(err);
    }
})

//kits update
router.post('/kit/:link/edit', mid.mustBeLoggedIn, (req, res, next) => {
   // console.log(util.inspect(req.body, {showHidden: false, depth: null}))
   if (req.body.kitTitle &&
      req.body.sections[0].sectionTitle){
      Kit.updateKit(req, res, next);
   }
    else {
       const err = new Error('All fields are required');
       return next(err);
    }
})

//kits edit
router.get('/kit/:link/edit', mid.mustBeLoggedIn, (req, res, next) => {
    Kit.find({link: req.params.link}).exec( function (err, kit) {
      if(err){
        return next(err);
      }
      else{
        Section.find({kit: kit}).populate('resources')
        .exec( function (err, sections){
          if(err){
            return next(err)
          }
          else {
            res.render('kit-edit', {kit: kit, sections: sections, req: req, res: res})
          }
        })
      }
    })
})

//kit show
router.get('/kit/:link', (req, res, next) => {
    Kit.find({link: req.params.link}).populate('sections')
    .exec( function (err, kit) {
      if(err){

        return next(err);
      }
      else{
        Section.find({kit: kit}).populate('resources')
        .exec( function (err, sections){
          if(err){
            return next(err)
          }
          else {
            res.render('kit-show', {kit: kit, sections: sections, req: req, res: res})
          }
        })
      }
    })
})

module.exports = router;
