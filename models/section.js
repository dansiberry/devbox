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

SectionSchema.statics.createSection = function(section, kit, req, next) {
    sectionData = {
      title: section.sectionTitle,
      content: section.sectionContent,
      kit: kit._id
    };
    kit.keywords+= (" " + section.sectionTitle.toString().toLowerCase())
    return Section.create(sectionData)
}

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
