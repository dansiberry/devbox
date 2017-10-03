const mongoose = require('mongoose');
const Section = require('./section');
const Resource = require('./resource');
const User = require('./user');
const util = require('util');
const db = mongoose.connection;


const KitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }],
  link: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User' }
});

KitSchema.statics.createKit = function(req, res, next) {
  run(req, res, next).catch(error => next(error));
    console.log("called Create Kit")

  async function run(req, res, next) {

  //kit content not in use
  req.body.kitContent = 'null'

  if (req.session.userId) {
      kitData = {
      title: req.body.kitTitle,
      content: req.body.kitContent,
      user: req.session.userId,
      link: req.body.kitTitle.replace(/\s/g,'-') + "-" + Math.floor(Math.random()*1000000),
      keywords: req.body.kitTitle.toLowerCase() + " " + req.body.kitContent.toLowerCase()
    };
  }
  else {
        kitData = {
        title: req.body.kitTitle,
        content: req.body.kitContent,
        user: res.master.id,
        link: req.body.kitTitle.replace(/\s/g,'-') + "-" + Math.floor(Math.random()*1000000),
        keywords: req.body.kitTitle.toLowerCase() + " " + req.body.kitContent.toLowerCase()
        };
  }

    let kit = await Kit.create(kitData)
    let sections = await Section.createSections(kit, req, next);
    for(i = 0; i < sections.length; i++){
      kit.sections.push(sections[i]._id);
    }
    await kit.save();
    let resources = await Resource.createResources(sections, req, next);
    res.redirect('../kit/' + kit.link)
  }
}

KitSchema.statics.updateKit = function(req, res, next) {
  run(req, res, next).catch(error => next(error));
  async function run(req, res, next) {
    console.log(req.body);
    kitData = {
      title: req.body.kitTitle,
      content: req.body.kitContent,
      user: req.session.userId,
      link: req.params.link
    };
    await Kit.find({link: req.params.link}).remove().exec()
    let kit = await Kit.create(kitData)
    let sections = await Section.createSections(kit, req, next);
    for(i = 0; i < sections.length; i++){
      kit.sections.push(sections[i]._id);
    }
    let resources = await Resource.createResources(sections, req, next);
    res.redirect('../' + kit.link)
  }
}

KitSchema.statics.hasMinimumCreateInput = function(req, res, next) {
  if(
    req.body.hasOwnProperty("kitTitle") &&
    req.body.hasOwnProperty("kitContent") &&
    req.body.hasOwnProperty("sections") &&
    req.body.sections[0].hasOwnProperty("sectionTitle")
  ){
    return true
  }
}

KitSchema.pre('remove', async function(next) {
  run(next).catch(error => next(error));
  async function run(next) {
    await Section.find({kit: this.id}).remove().exec();
    await Resource.find({kit: this.id}).remove().exec();
    next();
  }
});



const Kit = mongoose.model('Kit', KitSchema);
module.exports = Kit;
