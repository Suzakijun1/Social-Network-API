const { User, Thought } = require("./models");

const userController = {
  //Get all users
  getUsers(req, res) {
    User.find();
  },
};
