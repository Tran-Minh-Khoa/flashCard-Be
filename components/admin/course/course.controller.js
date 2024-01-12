const service = require("./course.service");
exports.CoursesPage = async (req, res, next) => {
    const styles = [
        "/admin/vendor/datatables/dataTables.bootstrap4.min.css",
        "/adminExtra/styles/card-list.css",
      ];
      const scripts = [
        "/admin/js/datatables/table-card.js",
        "/admin/vendor/datatables/jquery.dataTables.min.js",
        "/admin/vendor/datatables/dataTables.bootstrap4.min.js",
        "/adminExtra/scripts/set-list.js",
      ];
      const courses = await service.getAllCourses();
      const promises = courses.map(async (course) => {
        const users = await service.getUsers(course.studentId);
        const decks = await service.getDecks(course.decks);
        course.usersLength = users.length;
        course.decksLength = decks.length;
        console.log(course.usersLength);
        console.log(course.decksLength);
      });
  
      // Đợi cho tất cả các promises hoàn tất trước khi render
      await Promise.all(promises);

     
      res.render("admin/course", {
        layout: "admin/layouts/layout",
        title: "Courses",
        scripts: scripts,
        styles: styles,
        courses: courses,
        currentUser: req.user,
      });
}
exports.DisableCourse = async (req, res, next) => {
    try {
        const  courseId= req.params.courseId;
        const updatedCourse = await service.DisableCourse(courseId);
        res.status(200).json(updatedCourse);
      } catch (error) {
        console.error("Error disabling set:", error);
        res.status(500).send("Internal Server Error");
      }
}
exports.EnableCourse = async (req, res, next) => {
    const  courseId= req.params.courseId;
  
    try {
      const updatedCourse = await service.EnableCourse(courseId);
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error("Error enabling set:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  exports.DeleteCourse = async function (req, res, next) {
    const  courseId= req.params.courseId;
  
    try {
      const deletedDeck = await service.DeleteCourse(courseId);
  
      if (!deletedDeck) {
        return res.status(404).json({ message: "Set not found" });
      }
  
      res.status(200).json({ message: "Set deleted successfully", deletedDeck });
    } catch (error) {
      console.error("Error in set deletion API:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
