const mongoose = require('mongoose');
const Section = require('./section');
const User = require('./user');
const util = require('util');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
   kit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kit'
  }
});

ResourceSchema.statics.createResources = function(section, index, req, res, next) {

    let sec = "sec-" + (index + 1)
    let dataPile = []

    for(var key in req.body.resources[sec]) {
        var value = req.body.resources[sec][key];

        if (!(value.resourceLink.includes("http"))) {
         value.resourceLink = "http://" + value.resourceLink
         }

        dataPile.push({
          title: value.resourceTitle,
          link: value.resourceLink,
          user: req.session.userId,
          kit: section.kit
        });
    }
    let promisePile = dataPile.map(resourceData => {
        return Resource.create(resourceData).then((resource) => {
          section.resources.push(resource)
        })
    })
    return Promise.all(promisePile).then(() => section.save())
}

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;
