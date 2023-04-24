const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        cards: [],
    }
)

module.exports = mongoose.model("Lessons", LessonSchema);