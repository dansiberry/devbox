const mongoose = require('mongoose');
const Resource = require('./resource');
const util = require('util');

const SectionSchema = new mongoose.Schema({
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
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  kit: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Kit' }
});

SectionSchema.statics.createSections = function(kit, req, next) {
  let proms = []
  const returnSections = []
  for (i = 0; i < req.body.sections.length; i++) {
    sectionData = {
      title: req.body.sections[i].sectionTitle,
      content: req.body.sections[i].sectionContent,
      kit: kit._id
    };
    kit.keywords+= (" " + req.body.sections[i].sectionTitle.toString().toLowerCase())
    proms.push(Section.create(sectionData).then((sec) => {
      returnSections.push(sec)
    }))
  }
  return Promise.all(proms).then(() => {
    return returnSections
  })
}

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
