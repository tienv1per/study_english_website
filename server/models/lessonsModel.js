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
        numberCards: {
            type: Number,
            default: 0,
        }
    }
)

module.exports = mongoose.model("Lessons", LessonSchema);