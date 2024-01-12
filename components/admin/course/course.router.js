const express = require("express");
const router = express.Router();
const controller = require("./course.controller");

router.get("/", controller.CoursesPage);
router.put("/disable/:courseId", controller.DisableCourse);
router.put("/enable/:courseId", controller.EnableCourse);
router.delete("/delete/:courseId", controller.DeleteCourse);
module.exports = router;