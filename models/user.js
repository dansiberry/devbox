const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

//hash and salt passwords
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//authenticate users on sign in
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({email: email})
   .exec(function(error, user){
    if (error) {
      return callback(error);
    }
    else if (!user) {
      const err = new Erron('user not found');
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(error, result){
      if(result === true) {
        return callback(null, user);
      }
      else {
        return callback(error);
      }
    })
   })
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
