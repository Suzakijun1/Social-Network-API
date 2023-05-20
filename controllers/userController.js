const { User, Thought } = require("./models");

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
};
