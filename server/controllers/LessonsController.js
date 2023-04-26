const LessonModel = require("../models/lessonsModel");

module.exports.getLessons = async(req, res, next) =>{
    try {
        const lessons = await LessonModel.find();
        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getLesson = async(req, res, next) => {
    const id = req.params.id;

    try {
        const lesson = await LessonModel.findById(id);
        if(lesson) {
            return res.status(200).json(lesson);
        }
        else {
            return res.status(404).json({message: "Lesson not exist, same length ID"});
        }
        
    } catch (error) {
        return res.status(500).json({message: "Lesson not exist, different length ID"});
    }
}

module.exports.createLesson = async(req, res, next) =>{
    const newLesson = new LessonModel(req.body);
    try {
        const savedLesson = await newLesson.save();
        return res.status(200).json(savedLesson);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.updateLesson = async(req, res, next) =>{
    const id = req.params.id;

    try {
        const lesson = await LessonModel.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.deleteLesson = async(req, res, next) =>{
    const id = req.params.id;
    try {
        const lesson = await LessonModel.findByIdAndDelete(id);
        console.log(1);
        return res.status(200).json({
            message: "Delete lesson successfully",
            lesson: lesson,
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}