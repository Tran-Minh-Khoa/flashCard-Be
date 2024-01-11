const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true },
  decks: { type: Array },
  studentId: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
