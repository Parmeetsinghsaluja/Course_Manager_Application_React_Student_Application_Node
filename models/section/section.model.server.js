var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function deleteSection(section) {
    return sectionModel.deleteOne(section,function(err, section){
        return section;
        });
    }

function updateSection(newSection) {
    sectionModel.findById(newSection._id, function(err, section){
        section.name = newSection.name;
        section.seats = newSection.seats;
        section.save(function(err) {
            if (err) throw err;
            return section;
        });
    });
}
function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: -1}
  });
}

function incrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: +1}
  });
}

module.exports = {
  createSection: createSection,
  deleteSection: deleteSection,
  updateSection: updateSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats
};