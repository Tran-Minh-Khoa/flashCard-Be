const Course = require("../../../models/Course");
const User = require("../../../models/User");
const Deck = require("../../../models/Deck");
exports.getAllCourses = async () => {
    const courses = await Course.find();
    return courses;
}
exports.DisableCourse = async (courseId) => {
    try {
      const updatedCourse = {
        isActive: false,
      };
  
      const result = await Course.findOneAndUpdate(
        { courseId: courseId },
        { $set: updatedCourse },
        { new: true }
      );
  
      return result;
    } catch (error) {
      console.error("Error disabling set:", error);
      throw error;
    }
  };
exports.EnableCourse = async (courseId) => {
    try {
      const updatedCourse = {
        isActive: true,
      };
  
      const result = await Course.findOneAndUpdate(
        { courseId: courseId },
        { $set: updatedCourse },
        { new: true }
      );
  
      return result;
    } catch (error) {
      console.error("Error enabling set:", error);
      throw error;
    }
  };
  
  exports.DeleteCourse = async (courseId) => {
    try {
      const result = await Course.findOneAndDelete({ courseId: courseId });
  
      if (!result) {
        throw new Error("Set not found");
      }
  
      return result;
    } catch (error) {
      console.error("Error deleting set:", error);
      throw error;
    }
  };
  exports.getUsers = async (userList) => {
      try
      {
          const users = await User.find({ publicId: { $in: userList } });
          return users;
      }
      catch (error) {
      console.error("Error get users:", error);
      throw error;
    }
}
exports.getDecks = async (deckList) => {
    try
    {
        const decks = await Deck.find({ deckId: { $in: deckList } });
        return decks;
       
    }
    catch(error)
    {
        throw new Error(error)
    }
}
  