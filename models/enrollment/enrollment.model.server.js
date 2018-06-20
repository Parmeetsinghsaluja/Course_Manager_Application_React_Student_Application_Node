var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function unenrollStudentInSection(enrollment) {
    return enrollmentModel.deleteOne(enrollment);
}

function deleteEnrollments(newSection) {
    return enrollmentModel.remove({section : newSection._id}).exec();
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  unenrollStudentInSection: unenrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  deleteEnrollments: deleteEnrollments
};