var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}
function updateUser(newUser) {
    userModel.findById(newUser.userId, function(err, user){
        user.username = newUser.username;
        user.lastName = newUser.lastName;
        user.firstName = newUser.firstName;
        user.email = newUser.email;
        user.address = newUser.address;
        user.phoneNumber = newUser.phoneNumber;
        user.save(function(err) {
            if (err) throw err;
        });
    });
}
function findUserByUsername(username) {
  return userModel.count({username : username});
}
function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  updateUser: updateUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
};

module.exports = api;