const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://107.0.0.1:27017/socialmedia",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Export connection
module.exports = mongoose.connection;
