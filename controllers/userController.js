const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //Get single users
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      //excludes the __v field from the user object, which is automatically added by Mongoose to track the document version
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((response) => {
        // console.log(response);
        !response
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((response) => {
        !response
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((response) => {
        console.log(response);
        !response
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((response) => {
        console.log(response);
        !response
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
};
