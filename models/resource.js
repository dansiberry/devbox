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

ResourceSchema.statics.createResources = function(sections, req, next) {
  let proms = []
  for(i = 0; i < sections.length; i++){
    proms.push(sectionResource(sections[i], i, req, next))
  }

  function sectionResource(section, sectionNumber, req, next){
    let innerProms = []
    let sec = "sec-" + sectionNumber
    for(var key in req.body.resources[sec]) {
        var value = req.body.resources[sec][key];

        if (!(value.resourceLink.includes("http"))) {
         value.resourceLink = "http://" + value.resourceLink
         }

        resourceData = {
          title: value.resourceTitle,
          link: value.resourceLink,
          user: req.session.userId,
          kit: section.kit
        };

        innerProms.push(Resource.create(resourceData).then((resource) => {
          section.resources.push(resource);
          // section.save()
        }))
    }
    console.log('-----innerProms---------')
    console.log(innerProms)
    return Promise.all(innerProms).then(() => section.save())
    console.log("-----------------------")
  }
  console.log('-----Proms---------')
  console.log(proms)
  console.log("-----------------------")
  return Promise.all(proms)
}

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;
