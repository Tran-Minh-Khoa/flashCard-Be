const ServiceCourse = require('./course.service');
exports.getAllCourse = async (req, res, next) => {
    try {
        const creatorId = req.user.id
        const studentId = req.user.publicId
        const result = await ServiceCourse.getAllCourse(creatorId,studentId)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.createCourse = async (req, res, next) => {
    try {
        const userId = req.user.id
        const course = req.body
        const result = await ServiceCourse.createCourse(userId,course)
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.addDeck = async (req, res, next) => {
    try {
        const courseId = req.body.courseId
        const userId = req.user.id
        const deckId = req.body.deckId
        const result = await ServiceCourse.addDeck(userId,deckId,courseId)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.addUser = async (req, res, next) => {
    try
    {
        const courseId = req.body.courseId
        const creatorId = req.user.id
        const userId = req.body.userId
        const result = await ServiceCourse.addUser(userId,courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}
exports.removeUser = async (req, res, next) => {
    try
    {
        const courseId = req.body.courseId
        const creatorId = req.user.id
        const userId = req.body.userId
        const result = await ServiceCourse.removeUser(userId,courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}
exports.removeDeck = async (req, res, next) => {
    try
    {
        const courseId = req.body.courseId
        const creatorId = req.user.id
        const deckId = req.body.deckId
        const result = await ServiceCourse.removeDeck(deckId,courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}
exports.getUsers = async (req, res, next) => {
    try
    {
        const courseId = req.body.courseId
        const creatorId = req.user.id
        const result = await ServiceCourse.getUsers(courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}
exports.updateCourse = async (req, res, next) => {
    try
    {
        const courseInfo = req.body
        const creatorId = req.user.id
        const result = await ServiceCourse.updateCourse(courseInfo,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}
exports.getAllDeck = async (req, res, next) => {
    try
    {
        const courseId = req.params.courseId
        const result = await ServiceCourse.getAllDeck(courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}