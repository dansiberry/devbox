const User = require('../models/user');

function mustBeLoggedOut(req, res, next) {
  if(req.session && req.session.userId){
    return res.redirect('/profile');
  }
  else{
    next();
  }
}

// function getReactKits(req, res, next) {
//      Kit.find({}, function (err, allKits){
//         if(err){
//           next(error);
//         }
//         else {
//             res.allKits: allKits
//         }
//     })
// }


function mustBeLoggedIn(req, res, next) {
  if(req.session && req.session.userId){
    User.findById(req.session.userId).exec(function(error, user) {
      if(error){
        return next(error);
      }
      else {
       res.locals.currentUser = user
       next();
      }
    });
  }
  else{
    return res.redirect('/sign-in');
  }
}



module.exports.mustBeLoggedOut = mustBeLoggedOut;
module.exports.mustBeLoggedIn = mustBeLoggedIn;
