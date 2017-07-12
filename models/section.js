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

SectionSchema.statics.createSections = async function(kit, req, next) {
  const returnSections = []
  for (i = 0; i < req.body.sections.length; i++) {
    sectionData = {
      title: req.body.sections[i].sectionTitle,
      content: req.body.sections[i].sectionContent,
      kit: kit._id
    };
    let sec = await Section.create(sectionData)
    returnSections.push(sec)
  }
  // console.log(util.inspect(returnSections, {showHidden: false, depth: null}) + "SEC")
  return returnSections
}


// function buildSection(kit, req){
//   console.log('using build section')
//   const returnSections = []
//   run(kit, req).catch(error => console.error(error.stack));

//   async function run(kit, req){
//       sectionData = {
//         title: req.body.sections.sectionTitle,
//         content: req.body.sections.sectionContent,
//         kit: kit._id
//       };
//       let sec = await Section.create(sectionData)
//       returnSection.push(sec)
//   }
//   return returnSection
// }

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;

