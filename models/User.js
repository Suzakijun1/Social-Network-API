const { Schema, model } = require("mongoose");

const username = new Schema({
  first: String,
  Unique: true,
  required: true,
  trimmed: true,
});

const courseSchema = new S();
