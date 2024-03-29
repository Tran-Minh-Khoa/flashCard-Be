const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  creatorId: { type: String, required: true },
  studentId : { type: Array },
  decks: { type: Array },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
