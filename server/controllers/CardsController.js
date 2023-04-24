const Card = require("../models/cardsModel");
const Lesson = require("../models/lessonsModel");

module.exports.createCard = async(req, res, next) => {
    const lessonId = req.params.lessonId;
    const newCard = new Card(req.body);

    try {
        await Lesson.findByIdAndUpdate(lessonId, {
            $inc: {numberCards: 1}
        })
        newCard.lesson = lessonId;
        const savedCard = await newCard.save();
        return res.status(200).json(savedCard);
    } catch (error) {
        return res.status(404).json({message: "Lesson not found"});
    }
}

module.exports.updateCard = async(req, res, next) => {
    const id = req.params.id;

    try {
        const card = await Card.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json(card);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.deleteCard = async(req, res, next) => {
    const id = req.params.id;
    try {
        const card = await Card.findByIdAndDelete(id);
        const lessonId = card.lesson;
        await Lesson.findByIdAndUpdate(lessonId, {
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
        const card = await Card.findById(id);
        return res.status(200).json(card);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.getCards = async(req, res, next) => {
    try {
        const cards = await Card.find();
        return res.status(200).json(cards);
    } catch (error) {
        return res.status(500).json(error);
    }
}