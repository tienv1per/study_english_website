const CardModel = require("../models/cardsModel");
const LessonModel = require("../models/lessonsModel");
const mongoose = require("mongoose");

module.exports.createCard = async(req, res, next) => {
    const lessonId = req.params.lessonId;
    const {name, imageURL, desc} = req.body;
    const newCard = new CardModel(req.body);

    if(name === "" || imageURL === "" || desc === "") {
        return res.status(201).json({
            message: "Please fill all required fields",
            success: false,
        })
    }

    try {
        await LessonModel.findByIdAndUpdate(lessonId, {
            $inc: {numberCards: 1}
        })
        newCard.lesson = lessonId;
        const savedCard = await newCard.save();
        return res.status(200).json({
            success: true,
            card: savedCard,
            message: "add card successfully",
        });
    } catch (error) {
        return res.status(404).json({message: "Lesson not found"});
    }
}

module.exports.updateCard = async(req, res, next) => {
    const id = req.params.id;
    const {name, imageURL, desc} = req.body;
    if(name === "" || imageURL === "" || desc === "") {
        return res.status(201).json({
            message: "Please fill all required fields",
            success: false,
        })
    }

    try {
        const card = await CardModel.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json({
            success: true,
            card: card,
            message: "Update card successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.deleteCard = async(req, res, next) => {
    const id = req.params.id;
    try {
        const card = await CardModel.findByIdAndDelete(id);
        const lessonId = card.lesson;
        await LessonModel.findByIdAndUpdate(lessonId, {
            $inc: {numberCards: -1}
        })
        return res.status(200).json({
            message: "Delete card successfully",
            card: card,
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.getCard = async (req, res, next) => {
    const id = req.params.id;
    try {
        const card = await CardModel.findById(id);
        return res.status(200).json(card);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.getCards = async(req, res, next) => {
    try {
        const cards = await CardModel.find();
        return res.status(200).json(cards);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getCardsInLesson = async(req, res, next) => {
    const lessonId = new mongoose.Types.ObjectId(req.params.lessonId);
    try {
        const cards = await CardModel.find({lesson: lessonId});
        return res.status(200).json(cards);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}