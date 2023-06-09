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
    const {name, imageURL} = req.body;
    if(name === "" || imageURL === "") {
        return res.status(201).json({
            message: "Please fill all required fields",
            success: false,
        })
    }
    const lesson = await LessonModel.findOne({name: name});
    if (lesson) {
        return res.status(201).json({
            message: "Name Lesson already exists",
            success: false,
        })
    }
    const newLesson = new LessonModel({name, imageURL});
    try {
        const savedLesson = await newLesson.save();
        return res.status(200).json({
            success: true,
            lesson: savedLesson,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.updateLesson = async(req, res, next) =>{
    const id = req.params.id;
    const {name, imageURL} = req.body;
    if(name === "" || imageURL === "") {
        return res.status(201).json({
            message: "Please fill all required fields",
            success: false,
        })
    }

    try {
        const lesson = await LessonModel.findByIdAndUpdate(id, {name, imageURL}, {new: true});
        return res.status(200).json({
            success: true,
            lesson: lesson,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.deleteLesson = async(req, res, next) =>{
    const id = req.params.id;
    try {
        const lesson = await LessonModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Delete lesson successfully",
            lesson: lesson,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}