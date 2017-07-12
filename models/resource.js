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
  user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User' }
});

ResourceSchema.statics.createResources = async function(sections, req, next) {
  for(i = 0; i < sections.length; i++){
    await sectionResource(sections[i], i, req, next)
  }

  async function sectionResource(section, sectionNumber, req, next){
    let sec = "sec-" + sectionNumber
    for(var key in req.body.resources[sec]) {
        var value = req.body.resources[sec][key];
        resourceData = {
          title: value.resourceTitle,
          link: value.resourceLink,
          user: req.session.userId
        };
        let resource = await Resource.create(resourceData)
        section.resources.push(resource);
        await section.save()
     }
  }
}

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;
