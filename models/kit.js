const mongoose = require('mongoose');
const Section = require('./section');
const Resource = require('./resource');
const util = require('util');

const KitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }],
  user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User' }
});

KitSchema.statics.createKit = function(req, res, next) {
  run(req, res, next).catch(error => console.error(error.stack));

  async function run(req, res, next) {
    kitData = {
      title: req.body.kitTitle,
      content: req.body.kitContent,
      user: req.session.userId
    };
    let kit = await Kit.create(kitData)
    let sections = await Section.createSections(kit, req, next);
    console.log(util.inspect(kit, {showHidden: false, depth: null}) + 'THE KIT')
    console.log(util.inspect(sections, {showHidden: false, depth: null}) + 'SECTIONS')
    kit.sections.push(sections[0]._id);
    await kit.save();
    let resources = await Resource.createResources(sections, req, next);
    res.redirect('../kit/' + kit._id)
  }
}

const Kit = mongoose.model('Kit', KitSchema);
module.exports = Kit;
