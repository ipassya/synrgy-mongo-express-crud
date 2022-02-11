const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const studentSchema = new Schema({
  nim: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
