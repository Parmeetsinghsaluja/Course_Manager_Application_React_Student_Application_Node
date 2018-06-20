module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.put('/api/user', updateUser);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        req.session['currentUser'] = user;
        res.json(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
    var user = req.session['currentUser'];
    if (user == null){
        res.sendStatus(403);
    }
    else {
        userModel.findUserById(user._id)
            .then(function (user) {
            res.json(user);
        })
    }
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.findUserByUsername(user.username)
        .then(function (count) {
            if(count === 0){
                userModel.createUser(user)
                    .then(function (user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    })
            }
            else{
                res.send({Status: "Username Taken"});
            }
        });
  }
  function updateUser(req, res) {
      var user = req.body;
      userModel.updateUser(user);
      res.send(200);
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
