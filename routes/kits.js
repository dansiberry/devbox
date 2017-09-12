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

//kits Delete
router.get('/kit/:link/delete', (req, res) => {
    Kit.find({link: req.params.link}).remove().exec( function (err, kit) {
      if(err){
        return next(err);
      }
      else{
        res.redirect('../../profile')
       }
    })
})

//kits favorite
router.get('/kit/:link/favorite',mid.mustBeLoggedIn, (req, res) => {
    Kit.find({_id: req.params.link}).exec( function (err, kit) {
      if(err){
        return next(err);
      }
      else{
        User.find({_id: res.locals.currentUser}).exec( function (err, user) {
          if(err){
            return next(err);
          }
          else {
            console.log(user[0])
            user[0].favorites.push(kit[0])
            user[0].save()
            console.log(user[0])
          }
          res.redirect('../../profile')
        })
      }
    })
})

//kits create
router.post('/kits/new', (req, res, next) => {

    User.find({ 'email': 'master@master.com' }, function (err, person) {
      if (err) return next(err);
         res.master = person[0]
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
    Kit.find({link: req.params.link}).populate('sections').populate('user')
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
            let editable = false
            let favorited = false
            if (res.locals.currentUser == kit[0].user._id) {
              editable = true
            }
            User.find({_id: res.locals.currentUser}).exec( function (err, user){
              if(err){
                return next(err);
              }
              else{
                if(user[0]) {
                  if((user[0].favorites.indexOf(kit[0].id)) >= 0) {
                    favorited = true
                  }
                }
                res.render('kit-show', {kit: kit, sections: sections, req: req, res: res, editable: editable, favorited: favorited})
              }
            })
          }
        })
      }
    })
})

module.exports = router;
